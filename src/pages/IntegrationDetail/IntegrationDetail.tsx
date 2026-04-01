import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listings, bundles } from '../../data/listings';
import { useEcosystem } from '../../contexts/EcosystemContext';

// Benefit icons (simple SVG paths keyed by index)
const benefitIcons = [
  // user-check
  <svg key="0" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M12 15.75v-1.5A3 3 0 009 11.25H3.75a3 3 0 00-3 3v1.5" stroke="#3d8c40" strokeWidth="1.5" strokeLinecap="round"/><circle cx="6.375" cy="6.375" r="2.625" stroke="#3d8c40" strokeWidth="1.5"/><path d="M13.5 8.25l1.5 1.5 3-3" stroke="#3d8c40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  // zap
  <svg key="1" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M10.5 1.5L3 10.5h6.75L7.5 16.5l9-9H9.75L10.5 1.5z" stroke="#3d8c40" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  // sliders
  <svg key="2" width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 4.5h12M3 9h12M3 13.5h12" stroke="#3d8c40" strokeWidth="1.5" strokeLinecap="round"/><circle cx="6" cy="4.5" r="1.5" fill="#3d8c40"/><circle cx="12" cy="9" r="1.5" fill="#3d8c40"/><circle cx="6" cy="13.5" r="1.5" fill="#3d8c40"/></svg>,
  // layout
  <svg key="3" width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.25" y="2.25" width="13.5" height="13.5" rx="2" stroke="#3d8c40" strokeWidth="1.5"/><path d="M2.25 7.5h13.5" stroke="#3d8c40" strokeWidth="1.5"/><path d="M7.5 7.5v8.25" stroke="#3d8c40" strokeWidth="1.5"/></svg>,
];

function DirectionBadge({ direction }: { direction: '→' | '←' | '↔' }) {
  const color = direction === '→' ? '#3d8c40' : direction === '←' ? '#6c2bd9' : '#b45300';
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[15px] font-bold" style={{ color, background: color + '18' }}>
      {direction}
    </span>
  );
}

function StatusPill({ status }: { status?: string }) {
  if (!status) return null;
  const isDefault = status === 'Default';
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
        isDefault ? 'bg-[#eaf4ea] text-[#2f7032]' : 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]'
      }`}
    >
      {status}
    </span>
  );
}

export function IntegrationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInstalled, toggleInstall, treatment } = useEcosystem();
  const installed = isInstalled(id ?? '');
  const [setupModalOpen, setSetupModalOpen] = useState(false);
  const [oauthModalOpen, setOauthModalOpen] = useState(false);
  const [oauthStep, setOauthStep] = useState<1 | 2 | 3>(1);

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)] px-8 py-10">
        <button
          type="button"
          onClick={() => navigate('/ecosystem')}
          className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Ecosystem Hub
        </button>
        <p className="text-[16px] text-[var(--text-neutral-x-strong)]">Integration not found.</p>
      </div>
    );
  }

  const hasDiscount =
    listing.metadata.discountPackaging && listing.metadata.discountPackaging !== 'None';
  const pricingTitle = hasDiscount ? 'BambooHR customer offer' : 'Pricing';
  const pricingHeadline = hasDiscount
    ? listing.metadata.discountPackaging
    : 'This integration is free to connect with BambooHR.';
  const pricingDescription = hasDiscount
    ? listing.metadata.planRequired
      ? `Discounted pricing is available for BambooHR customers. A separate ${listing.metadata.publisher} ${listing.metadata.planRequired} account is still required.`
      : 'Discounted pricing is available for BambooHR customers. Partner account requirements may still apply separately.'
    : listing.metadata.planRequired
      ? `There is no additional charge for the integration itself. A separate ${listing.metadata.publisher} ${listing.metadata.planRequired} account is required.`
      : `There is no additional charge for the integration itself. Any partner product pricing is handled separately by ${listing.metadata.publisher}.`;

  const metadataRows = [
    { label: 'Category', value: listing.metadata.category },
    { label: 'Integration type', value: listing.metadata.integrationType },
    { label: 'Data direction', value: listing.metadata.direction },
    { label: 'Sync trigger', value: listing.metadata.syncTrigger },
    { label: 'Sync frequency', value: listing.metadata.syncFrequency },
    { label: 'Publisher', value: listing.metadata.publisher },
    { label: 'Business size', value: listing.metadata.businessSize },
    { label: 'Published', value: listing.metadata.publicationDate },
    ...(listing.metadata.planRequired ? [{ label: 'Plan required', value: listing.metadata.planRequired }] : []),
  ];

  // Find which bundles reference this partner's sibling partners
  const siblingBundles = bundles
    .filter((b) => b.partnerIds.includes(listing.id))
    .map((b) => ({
      ...b,
      siblingNames: b.partnerIds
        .filter((pid) => pid !== listing.id)
        .map((pid) => listings.find((l) => l.id === pid)?.name ?? pid),
    }));

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)]">
      <div className="px-8 py-8 pr-10">
        {/* Back nav */}
        <button
          type="button"
          onClick={() => navigate('/ecosystem')}
          className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-neutral-medium)] transition-colors hover:text-[var(--text-neutral-x-strong)]"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Ecosystem Hub
        </button>

        {/* Two-column layout */}
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_260px]">
          {/* === MAIN COLUMN === */}
          <div className="flex flex-col gap-5">

            {/* a) Hero */}
            <section className="pb-2">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-5">
                  <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-white p-2">
                    <img
                      src={listing.logoSrc}
                      alt={`${listing.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <h1
                      className="text-[36px] font-semibold leading-[44px] text-[var(--color-primary-strong)]"
                      style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
                    >
                      {listing.name}
                    </h1>
                    <p className="mt-1 text-[13px] font-medium uppercase tracking-[0.06em] text-[var(--text-neutral-medium)]">
                      {listing.category}
                    </p>
                    <p className="mt-2 max-w-xl text-[15px] leading-6 text-[var(--text-neutral-x-strong)]">
                      {listing.previewDescription}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* b) Overview */}
            <section className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
              <h2 className="mb-1 text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                Overview
              </h2>
              <p className="text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">{listing.overview}</p>
            </section>

            {/* b) Benefits */}
            <section className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
              <h2 className="mb-4 text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                What this integration does
              </h2>
              <div className="flex flex-col gap-4">
                {listing.benefits.map((benefit, i) => (
                  <div key={benefit.title} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-[#eaf4ea]">
                      {benefitIcons[i % benefitIcons.length]}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{benefit.title}</p>
                      <p className="mt-0.5 text-[13px] leading-5 text-[var(--text-neutral-x-strong)]">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* c) What data syncs */}
            <section className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
              <h2 className="mb-1 text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                What data syncs
              </h2>
              {listing.dataSyncNote && (
                <p className="mb-4 text-[13px] leading-5 text-[var(--text-neutral-medium)]">{listing.dataSyncNote}</p>
              )}
              {listing.dataSync ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-[13px]">
                    <thead>
                      <tr className="border-b border-[var(--border-neutral-x-weak)]">
                        <th className="pb-2 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-neutral-medium)]">
                          BambooHR field
                        </th>
                        <th className="pb-2 pr-4 text-center text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-neutral-medium)]">
                          Direction
                        </th>
                        <th className="pb-2 pr-4 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-neutral-medium)]">
                          Partner field
                        </th>
                        <th className="pb-2 text-left text-[11px] font-semibold uppercase tracking-[0.06em] text-[var(--text-neutral-medium)]">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                      {listing.dataSync.map((row) => (
                        <tr key={`${row.bhrField}-${row.partnerField}`}>
                          <td className="py-2.5 pr-4 text-[var(--text-neutral-x-strong)]">{row.bhrField}</td>
                          <td className="py-2.5 pr-4 text-center">
                            <DirectionBadge direction={row.direction} />
                          </td>
                          <td className="py-2.5 pr-4 text-[var(--text-neutral-x-strong)]">{row.partnerField}</td>
                          <td className="py-2.5">
                            <StatusPill status={row.status} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">{listing.dataSyncFreeText}</p>
              )}
            </section>

            {/* d) How to set up — Manual only (External uses modal, Native uses OAuth modal) */}
            {treatment === 'Manual' && (
              <section className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
                <h2 className="mb-1 text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  How to set up
                </h2>
                <p className="mb-4 text-[13px] leading-5 text-[var(--text-neutral-medium)]">{listing.setupNote}</p>
                <ol className="flex flex-col gap-3">
                  {listing.setupSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf4ea] text-[12px] font-bold text-[#2f7032]">
                        {i + 1}
                      </span>
                      <p className="text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">{step}</p>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex flex-wrap gap-4">
                  <a href="#" className="text-[13px] font-medium text-[#3d8c40] underline underline-offset-2 hover:text-[#2f7032]">
                    Partner help article →
                  </a>
                  <a href="#" className="text-[13px] font-medium text-[#3d8c40] underline underline-offset-2 hover:text-[#2f7032]">
                    BambooHR help article →
                  </a>
                </div>
              </section>
            )}

            {/* e) Support */}
            <section className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
              <h2 className="mb-4 text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                Support
              </h2>
              <table className="w-full text-[13px]">
                <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                  {[
                    { label: 'Publisher', value: listing.support.publisher },
                    { label: 'Support hours', value: listing.support.hours },
                    { label: 'Phone', value: listing.support.phone },
                    { label: 'Email', value: listing.support.email },
                    ...(listing.support.channel ? [{ label: 'Support channel', value: listing.support.channel }] : []),
                  ].map((row) => (
                    <tr key={row.label}>
                      <td className="w-36 py-2.5 pr-4 text-[var(--text-neutral-medium)]">{row.label}</td>
                      <td className="py-2.5 text-[var(--text-neutral-x-strong)]">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </div>

          {/* === SIDEBAR === */}
          <div className="flex flex-col gap-4 xl:self-start">
            {/* CTA buttons — above sticky section */}
            {treatment === 'Hybrid' ? (
              <div className="flex flex-col gap-2 xl:sticky xl:top-6">
                <button
                  type="button"
                  onClick={() => setSetupModalOpen(true)}
                  className="w-full rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] transition-colors hover:bg-[var(--surface-neutral-x-weak)]"
                >
                  How to set up
                </button>
                <button
                  type="button"
                  onClick={() => toggleInstall(listing.id)}
                  className={`w-full rounded-[7px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                    installed
                      ? 'bg-[#eaf4ea] text-[#2f7032] hover:bg-[#d4eccc]'
                      : 'border border-[#3d8c40] text-[#3d8c40] hover:bg-[#eaf4ea]'
                  }`}
                >
                  {installed ? '✓ Connected' : 'Mark as connected'}
                </button>
              </div>
            ) : treatment === 'Manual' ? (
              <div className="flex flex-col gap-2 xl:sticky xl:top-6">
                <button
                  type="button"
                  onClick={() => setSetupModalOpen(true)}
                  className="w-full rounded-[7px] bg-[#3d8c40] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                >
                  How to set up
                </button>
              </div>
            ) : (
              /* Native */
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    if (!installed) {
                      setOauthStep(1);
                      setOauthModalOpen(true);
                    } else {
                      toggleInstall(listing.id);
                    }
                  }}
                  className={`w-full rounded-[7px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                    installed
                      ? 'bg-[#eaf4ea] text-[#2f7032] hover:bg-[#d4eccc]'
                      : 'bg-[#3d8c40] text-white hover:bg-[#2f7032]'
                  }`}
                >
                  {installed ? '✓ Installed' : 'Install'}
                </button>
              </div>
            )}

            {/* Sticky cards */}
            <div className="flex flex-col gap-4 xl:sticky xl:top-6">

            <div
              className="rounded-[12px] border border-[#e8c84a] p-5"
              style={{ background: '#fffdf0' }}
            >
              <span className="inline-block rounded-[5px] bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                {pricingTitle}
              </span>
              <p className="mt-3 text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">
                {pricingHeadline}
              </p>
              <p className="mt-1 text-[12px] leading-5 text-[var(--text-neutral-medium)]">
                {pricingDescription}
              </p>
            </div>

            {/* At a glance */}
            <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5">
              <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">
                At a glance
              </p>
              <div className="flex flex-col gap-2.5">
                {metadataRows.map((row) => (
                  <div key={row.label}>
                    <p className="text-[11px] font-semibold text-[var(--text-neutral-medium)]">{row.label}</p>
                    <p className="text-[12px] text-[var(--text-neutral-x-strong)]">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Part of a bundle */}
            {siblingBundles.length > 0 && (
              <div className="rounded-[12px] border border-[#c8e6c9] bg-[#f1faf1] p-5">
                <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.07em] text-[#2f7032]">
                  Part of a bundle
                </p>
                <div className="flex flex-col gap-3">
                  {siblingBundles.map((b) => (
                    <div key={b.id}>
                      <p className="text-[13px] font-semibold text-[var(--text-neutral-xx-strong)]">{b.name}</p>
                      {b.siblingNames.length > 0 && (
                        <p className="mt-0.5 text-[12px] text-[var(--text-neutral-medium)]">
                          Also includes: {b.siblingNames.join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* OAuth / setup modal — Native treatment only */}
      {oauthModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setOauthModalOpen(false); }}
        >
          <div className="relative w-full max-w-md rounded-[16px] bg-[var(--surface-neutral-white)] shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-neutral-x-weak)] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-10 items-center justify-center rounded-[8px] border border-[var(--border-neutral-x-weak)] bg-white p-1">
                  <img src={listing.logoSrc} alt={listing.name} className="h-full w-full object-contain" />
                </div>
                <h2 className="text-[18px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  {oauthStep === 3 ? 'Connected!' : `Connect ${listing.name}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOauthModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--icon-neutral-medium)] hover:bg-[var(--surface-neutral-x-weak)] hover:text-[var(--icon-neutral-strong)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Step indicators */}
            <div className="flex items-center gap-0 border-b border-[var(--border-neutral-x-weak)] px-6 py-3">
              {(['Authorize', 'Configure', 'Done'] as const).map((label, i) => {
                const stepNum = i + 1;
                const isActive = oauthStep === stepNum;
                const isDone = oauthStep > stepNum;
                return (
                  <div key={label} className="flex items-center">
                    <div className="flex items-center gap-1.5">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                        isDone ? 'bg-[#3d8c40] text-white' :
                        isActive ? 'bg-[#3d8c40] text-white' :
                        'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]'
                      }`}>
                        {isDone ? '✓' : stepNum}
                      </span>
                      <span className={`text-[12px] font-medium ${isActive ? 'text-[var(--text-neutral-xx-strong)]' : 'text-[var(--text-neutral-medium)]'}`}>
                        {label}
                      </span>
                    </div>
                    {i < 2 && <span className="mx-3 text-[var(--border-neutral-medium)]">—</span>}
                  </div>
                );
              })}
            </div>

            {/* Body */}
            <div className="px-6 py-6">
              {oauthStep === 1 && (
                <div className="flex flex-col gap-4">
                  <p className="text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">
                    Sign in to your <strong>{listing.name}</strong> account to grant BambooHR access. You'll be redirected to {listing.metadata.publisher} to complete authorization.
                  </p>
                  <div className="rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-4">
                    <p className="mb-2 text-[12px] font-semibold text-[var(--text-neutral-medium)]">BambooHR will be able to:</p>
                    <ul className="flex flex-col gap-1.5">
                      {['Read and sync employee records', 'Write back updated profile data', 'Access integration configuration settings'].map((perm) => (
                        <li key={perm} className="flex items-center gap-2 text-[13px] text-[var(--text-neutral-x-strong)]">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="#3d8c40" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          {perm}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOauthStep(2)}
                    className="flex w-full items-center justify-center gap-2 rounded-[7px] bg-[#3d8c40] px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="2" stroke="white" strokeWidth="1.3"/><path d="M5 8h6M8 5v6" stroke="white" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Authorize with {listing.name}
                  </button>
                </div>
              )}

              {oauthStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 rounded-[8px] bg-[#eaf4ea] px-4 py-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-[13px] font-medium text-[#2f7032]">Authorization successful</span>
                  </div>
                  <p className="text-[14px] text-[var(--text-neutral-x-strong)]">Choose which data to sync between BambooHR and {listing.name}.</p>
                  <div className="flex flex-col gap-2">
                    {[
                      { label: 'Employee profiles', checked: true },
                      { label: 'Job & department data', checked: true },
                      { label: 'Time-off balances', checked: false },
                      { label: 'Custom fields', checked: false },
                    ].map((opt) => (
                      <label key={opt.label} className="flex cursor-pointer items-center gap-3 rounded-[8px] border border-[var(--border-neutral-x-weak)] px-4 py-2.5 hover:bg-[var(--surface-neutral-xx-weak)]">
                        <input type="checkbox" defaultChecked={opt.checked} className="h-4 w-4 accent-[#3d8c40]" />
                        <span className="text-[14px] text-[var(--text-neutral-x-strong)]">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                  <div>
                    <label className="mb-1 block text-[12px] font-semibold text-[var(--text-neutral-medium)]">Sync frequency</label>
                    <select className="w-full rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-3 py-2 text-[14px] text-[var(--text-neutral-x-strong)]">
                      <option>Every hour</option>
                      <option>Every 4 hours</option>
                      <option>Daily</option>
                    </select>
                  </div>
                </div>
              )}

              {oauthStep === 3 && (
                <div className="flex flex-col items-center gap-4 py-4 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf4ea]">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><path d="M6 16l7 7L26 9" stroke="#2f7032" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <p className="text-[17px] font-semibold text-[var(--text-neutral-xx-strong)]">{listing.name} is now connected</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--text-neutral-medium)]">
                      Your first sync will run shortly. Employee data will begin flowing between BambooHR and {listing.name}.
                    </p>
                  </div>
                  <div className="w-full rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)] p-3 text-left">
                    <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Summary</p>
                    <div className="flex flex-col gap-1">
                      <p className="text-[12px] text-[var(--text-neutral-x-strong)]">Syncing: Employee profiles, Job &amp; department data</p>
                      <p className="text-[12px] text-[var(--text-neutral-x-strong)]">Frequency: Every hour</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-[var(--border-neutral-x-weak)] px-6 py-4">
              {oauthStep < 3 && (
                <button
                  type="button"
                  onClick={() => setOauthModalOpen(false)}
                  className="rounded-[7px] border border-[var(--border-neutral-medium)] px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
                >
                  Cancel
                </button>
              )}
              {oauthStep === 1 && null}
              {oauthStep === 2 && (
                <button
                  type="button"
                  onClick={() => setOauthStep(3)}
                  className="rounded-[7px] bg-[#3d8c40] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                >
                  Save &amp; connect
                </button>
              )}
              {oauthStep === 3 && (
                <button
                  type="button"
                  onClick={() => { toggleInstall(listing.id); setOauthModalOpen(false); }}
                  className="rounded-[7px] bg-[#3d8c40] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* How to set up modal — External treatment only */}
      {setupModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setSetupModalOpen(false); }}
        >
          <div className="relative w-full max-w-lg rounded-[16px] bg-[var(--surface-neutral-white)] shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-neutral-x-weak)] px-6 py-5">
              <h2 className="text-[18px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                How to set up
              </h2>
              <button
                type="button"
                onClick={() => setSetupModalOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--icon-neutral-medium)] hover:bg-[var(--surface-neutral-x-weak)] hover:text-[var(--icon-neutral-strong)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
              <p className="mb-5 text-[13px] leading-5 text-[var(--text-neutral-medium)]">{listing.setupNote}</p>
              <ol className="flex flex-col gap-4">
                {listing.setupSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#eaf4ea] text-[12px] font-bold text-[#2f7032]">
                      {i + 1}
                    </span>
                    <p className="text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">{step}</p>
                  </li>
                ))}
              </ol>
              <div className="mt-5 flex flex-wrap gap-4 border-t border-[var(--border-neutral-x-weak)] pt-4">
                <a href="#" className="text-[13px] font-medium text-[#3d8c40] underline underline-offset-2 hover:text-[#2f7032]">
                  Partner help article →
                </a>
                <a href="#" className="text-[13px] font-medium text-[#3d8c40] underline underline-offset-2 hover:text-[#2f7032]">
                  BambooHR help article →
                </a>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 border-t border-[var(--border-neutral-x-weak)] px-6 py-4">
              <button
                type="button"
                onClick={() => setSetupModalOpen(false)}
                className="rounded-[7px] border border-[var(--border-neutral-medium)] px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => { toggleInstall(listing.id); setSetupModalOpen(false); }}
                className={`rounded-[7px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                  installed
                    ? 'bg-[#eaf4ea] text-[#2f7032] hover:bg-[#d4eccc]'
                    : 'border border-[#3d8c40] text-[#3d8c40] hover:bg-[#eaf4ea]'
                }`}
              >
                {installed ? '✓ Connected' : 'Mark as connected'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntegrationDetail;
