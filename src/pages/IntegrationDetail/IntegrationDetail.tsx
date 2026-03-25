import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listings, bundles } from '../../data/listings';

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
  const [installed, setInstalled] = useState(false);

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
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-[6px] bg-[var(--surface-neutral-x-weak)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-neutral-medium)]">
                        {listing.category}
                      </span>
                      <span className="rounded-[6px] border border-[var(--border-neutral-medium)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-neutral-medium)]">
                        {listing.metadata.publisher}
                      </span>
                    </div>
                    <h1
                      className="mt-2 text-[36px] font-semibold leading-[44px] text-[var(--color-primary-strong)]"
                      style={{ fontFamily: 'Fields, system-ui, sans-serif' }}
                    >
                      {listing.name}
                    </h1>
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

            {/* d) How to set up */}
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
            {/* Install button — above sticky section */}
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setInstalled((v) => !v)}
                className={`flex-1 rounded-[7px] px-4 py-2 text-[14px] font-semibold transition-colors ${
                  installed
                    ? 'bg-[#eaf4ea] text-[#2f7032] hover:bg-[#d4eccc]'
                    : 'bg-[#3d8c40] text-white hover:bg-[#2f7032]'
                }`}
              >
                {installed ? '✓ Installed' : 'Install'}
              </button>
              <button
                type="button"
                className="flex-1 rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
              >
                View pricing
              </button>
            </div>

            {/* Sticky cards */}
            <div className="flex flex-col gap-4 xl:sticky xl:top-6">

            {/* Discount card — only if applicable */}
            {hasDiscount && (
              <div
                className="rounded-[12px] border border-[#e8c84a] p-5"
                style={{ background: '#fffdf0' }}
              >
                <span className="inline-block rounded-[5px] bg-[#1a1a1a] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white">
                  BambooHR customer offer
                </span>
                <p className="mt-3 text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">
                  {listing.metadata.discountPackaging}
                </p>
                <p className="mt-1 text-[12px] text-[var(--text-neutral-medium)]">
                  Exclusive pricing for BambooHR customers. Contact the partner to redeem.
                </p>
                <button
                  type="button"
                  className="mt-3 w-full rounded-[7px] bg-[#e8c84a] px-3 py-2 text-[13px] font-semibold text-[#1a1a1a] hover:bg-[#d4b432]"
                >
                  Claim discount
                </button>
              </div>
            )}

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
    </div>
  );
}

export default IntegrationDetail;
