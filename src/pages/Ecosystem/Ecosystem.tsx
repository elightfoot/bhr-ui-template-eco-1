import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listings, listingCategories, type Listing } from '../../data/listings';
import { useEcosystem, type Treatment } from '../../contexts/EcosystemContext';

type OauthStep = 1 | 2 | 3;

type PartnerType = 'All types' | 'One-way sync' | 'Two-way sync' | 'Platform connector';
type Tab = 'browse' | 'manage';

const partnerTypes: PartnerType[] = ['All types', 'One-way sync', 'Two-way sync', 'Platform connector'];

function getPartnerType(listing: Listing): PartnerType {
  const type = listing.metadata.integrationType.toLowerCase();
  if (type.includes('two-way')) return 'Two-way sync';
  if (type.includes('one-way')) return 'One-way sync';
  return 'Platform connector';
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Ecosystem() {
  const navigate = useNavigate();
  const { installedIds, toggleInstall, isInstalled, treatment, setTreatment } = useEcosystem();
  const [tab, setTab] = useState<Tab>('browse');
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [partnerType, setPartnerType] = useState<PartnerType>('All types');
  const [oauthListing, setOauthListing] = useState<Listing | null>(null);
  const [oauthStep, setOauthStep] = useState<OauthStep>(1);

  const installedListings = useMemo(
    () => listings.filter((l) => installedIds.has(l.id)),
    [installedIds],
  );

  const visibleListings = useMemo(() => {
    return listings.filter((l) => {
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.previewDescription.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q);
      const matchesCategory = category === 'All' || l.category === category;
      const matchesType = partnerType === 'All types' || getPartnerType(l) === partnerType;
      return matchesSearch && matchesCategory && matchesType;
    });
  }, [search, category, partnerType]);

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)]">
      {/* Treatment toolbar */}
      <div className="flex items-center gap-3 border-b border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-6 py-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--text-neutral-medium)]">
          Treatment
        </span>
        <div className="flex items-center rounded-[8px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-xx-weak)] p-0.5">
          {(['Hybrid', 'Manual', 'Native'] as Treatment[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTreatment(t)}
              className={`rounded-[6px] px-3 py-1 text-[13px] font-medium transition-colors ${
                treatment === t
                  ? 'bg-[var(--surface-neutral-white)] text-[var(--text-neutral-xx-strong)] shadow-[0_1px_3px_rgba(0,0,0,0.08)]'
                  : 'text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-6 px-8 py-10 pr-10">

        {/* Header */}
        <section className="flex flex-col gap-2">
          <h1
            className="text-[36px] font-semibold leading-[44px] text-[#3d8c40]"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Ecosystem Hub
          </h1>
          <p className="max-w-2xl text-[16px] leading-7 text-[var(--text-neutral-x-strong)]">
            Connect your apps to create a smoother, smarter experience — everything works better together.
          </p>
        </section>

        {/* Tabs */}
        <div className="border-b border-[var(--border-neutral-x-weak)]">
          <div className="flex items-end gap-6">
            {([
              { id: 'browse', label: 'Browse' },
              { id: 'manage', label: `Manage${installedListings.length > 0 ? ` (${installedListings.length})` : ''}` },
            ] as { id: Tab; label: string }[]).map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`border-b-2 pb-3 text-[15px] font-semibold transition-colors ${
                  tab === t.id
                    ? 'border-[#3d8c40] text-[#3d8c40]'
                    : 'border-transparent text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── BROWSE TAB ── */}
        {tab === 'browse' && (
          <>
            {/* Filter bar */}
            <section className="flex flex-wrap items-center gap-3">
              <div className="relative w-full sm:w-[280px]">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--icon-neutral-medium)]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search integrations"
                  className="h-9 w-full rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-8 pr-3 text-[14px] text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-medium)] focus:border-[#3d8c40] focus:outline-none"
                />
              </div>

              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-9 appearance-none rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-3 pr-8 text-[14px] text-[var(--text-neutral-x-strong)] focus:border-[#3d8c40] focus:outline-none"
                >
                  {listingCategories.map((c) => (
                    <option key={c} value={c}>{c === 'All' ? 'All categories' : c}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--icon-neutral-medium)]"><ChevronDown /></span>
              </div>

              <div className="relative">
                <select
                  value={partnerType}
                  onChange={(e) => setPartnerType(e.target.value as PartnerType)}
                  className="h-9 appearance-none rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-3 pr-8 text-[14px] text-[var(--text-neutral-x-strong)] focus:border-[#3d8c40] focus:outline-none"
                >
                  {partnerTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--icon-neutral-medium)]"><ChevronDown /></span>
              </div>

              <p className="ml-auto text-[13px] text-[var(--text-neutral-medium)]">
                {visibleListings.length} integration{visibleListings.length !== 1 ? 's' : ''}
              </p>
            </section>

            {/* Card grid */}
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleListings.map((listing) => {
                const installed = isInstalled(listing.id);
                return (
                  <article
                    key={listing.id}
                    className="group flex flex-col rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-white p-1.5">
                        <img src={listing.logoSrc} alt={`${listing.name} logo`} className="h-full w-full object-contain" />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-[16px] font-semibold text-[var(--text-neutral-xx-strong)]">{listing.name}</p>
                        <span className="inline-block rounded-[6px] bg-[var(--surface-neutral-x-weak)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-neutral-medium)]">
                          {listing.category}
                        </span>
                      </div>
                    </div>

                    <p className="mt-3 flex-1 text-[13px] leading-5 text-[var(--text-neutral-x-strong)]">
                      {listing.previewDescription}
                    </p>

                    <div className="mt-4 flex items-center gap-3">
                      {treatment === 'Hybrid' ? (
                        installed ? (
                          <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#eaf4ea] px-3 py-1.5 text-[13px] font-semibold text-[#2f7032]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Connected
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => toggleInstall(listing.id)}
                            className="rounded-[7px] border border-[#3d8c40] px-3 py-1.5 text-[13px] font-semibold text-[#3d8c40] transition-colors hover:bg-[#eaf4ea]"
                          >
                            Mark as connected
                          </button>
                        )
                      ) : treatment === 'Native' ? (
                        installed ? (
                          <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#eaf4ea] px-3 py-1.5 text-[13px] font-semibold text-[#2f7032]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M2 6L5 9L10 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            Installed
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => { setOauthListing(listing); setOauthStep(1); }}
                            className="rounded-[7px] bg-[#3d8c40] px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                          >
                            Install
                          </button>
                        )
                      ) : installed ? (
                        /* Manual — installed state only, no install button */
                        <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#eaf4ea] px-3 py-1.5 text-[13px] font-semibold text-[#2f7032]">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Installed
                        </span>
                      ) : null}
                      <button
                        type="button"
                        onClick={() => navigate(`/ecosystem/apps/${listing.id}`)}
                        className="text-[13px] font-medium text-[#3d8c40] underline underline-offset-2 hover:text-[#2f7032]"
                      >
                        Learn more
                      </button>
                      {installed && (
                        <button
                          type="button"
                          onClick={() => toggleInstall(listing.id)}
                          className="ml-auto text-[12px] text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>

            {visibleListings.length === 0 && (
              <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-8 py-12 text-center">
                <p className="text-[16px] font-semibold text-[var(--text-neutral-x-strong)]">No integrations found</p>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">Try adjusting your search or filters.</p>
              </div>
            )}
          </>
        )}

        {/* ── MANAGE TAB ── */}
        {tab === 'manage' && (
          <section>
            {installedListings.length === 0 ? (
              <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] px-8 py-16 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-neutral-x-weak)]">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M11 2a9 9 0 100 18A9 9 0 0011 2z" stroke="#3d8c40" strokeWidth="1.5"/>
                    <path d="M8 11h6M11 8v6" stroke="#3d8c40" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <p className="text-[16px] font-semibold text-[var(--text-neutral-x-strong)]">No integrations installed yet</p>
                <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
                  Browse the catalog and install an integration to manage it here.
                </p>
                <button
                  type="button"
                  onClick={() => setTab('browse')}
                  className="mt-5 rounded-[7px] bg-[#3d8c40] px-4 py-2 text-[14px] font-semibold text-white hover:bg-[#2f7032]"
                >
                  Browse integrations
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="text-[13px] text-[var(--text-neutral-medium)]">
                  {installedListings.length} connected integration{installedListings.length !== 1 ? 's' : ''}
                </p>
                <div className="overflow-hidden rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]">
                  {installedListings.map((listing, i) => (
                    <div
                      key={listing.id}
                      className={`flex items-center gap-4 px-5 py-4 ${
                        i < installedListings.length - 1 ? 'border-b border-[var(--border-neutral-x-weak)]' : ''
                      }`}
                    >
                      {/* Logo */}
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[9px] border border-[var(--border-neutral-x-weak)] bg-white p-1.5">
                        <img src={listing.logoSrc} alt={`${listing.name} logo`} className="h-full w-full object-contain" />
                      </div>

                      {/* Name + meta */}
                      <div className="min-w-0 flex-1">
                        <p className="text-[15px] font-semibold text-[var(--text-neutral-xx-strong)]">{listing.name}</p>
                        <p className="text-[12px] text-[var(--text-neutral-medium)]">
                          {listing.category} · {listing.metadata.syncFrequency}
                        </p>
                      </div>

                      {/* Status */}
                      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#eaf4ea] px-2.5 py-1 text-[12px] font-semibold text-[#2f7032]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#3d8c40]" />
                        Connected
                      </span>

                      {/* Actions */}
                      <div className="flex shrink-0 items-center gap-2">
                        <button
                          type="button"
                          onClick={() => navigate(`/ecosystem/apps/${listing.id}/manage`)}
                          className="rounded-[7px] border border-[var(--border-neutral-medium)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
                        >
                          Manage
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleInstall(listing.id)}
                          className="rounded-[7px] border border-[var(--border-neutral-medium)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-neutral-x-strong)] hover:border-red-300 hover:bg-red-50 hover:text-red-600"
                        >
                          Disconnect
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
      {/* OAuth / setup modal — Native treatment */}
      {oauthListing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.4)' }}
          onClick={(e) => { if (e.target === e.currentTarget) setOauthListing(null); }}
        >
          <div className="relative w-full max-w-md rounded-[16px] bg-[var(--surface-neutral-white)] shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border-neutral-x-weak)] px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-10 items-center justify-center rounded-[8px] border border-[var(--border-neutral-x-weak)] bg-white p-1">
                  <img src={oauthListing.logoSrc} alt={oauthListing.name} className="h-full w-full object-contain" />
                </div>
                <h2 className="text-[18px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  {oauthStep === 3 ? 'Connected!' : `Connect ${oauthListing.name}`}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOauthListing(null)}
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
                const stepNum = (i + 1) as OauthStep;
                const isActive = oauthStep === stepNum;
                const isDone = oauthStep > stepNum;
                return (
                  <div key={label} className="flex items-center">
                    <div className="flex items-center gap-1.5">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold ${
                        isDone || isActive ? 'bg-[#3d8c40] text-white' : 'bg-[var(--surface-neutral-x-weak)] text-[var(--text-neutral-medium)]'
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
                    Sign in to your <strong>{oauthListing.name}</strong> account to grant BambooHR access. You'll be redirected to {oauthListing.metadata.publisher} to complete authorization.
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
                    Authorize with {oauthListing.name}
                  </button>
                </div>
              )}

              {oauthStep === 2 && (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2 rounded-[8px] bg-[#eaf4ea] px-4 py-2.5">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 4" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    <span className="text-[13px] font-medium text-[#2f7032]">Authorization successful</span>
                  </div>
                  <p className="text-[14px] text-[var(--text-neutral-x-strong)]">Choose which data to sync between BambooHR and {oauthListing.name}.</p>
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
                    <p className="text-[17px] font-semibold text-[var(--text-neutral-xx-strong)]">{oauthListing.name} is now connected</p>
                    <p className="mt-1 text-[13px] leading-5 text-[var(--text-neutral-medium)]">
                      Your first sync will run shortly. Employee data will begin flowing between BambooHR and {oauthListing.name}.
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
                  onClick={() => setOauthListing(null)}
                  className="rounded-[7px] border border-[var(--border-neutral-medium)] px-4 py-2 text-[14px] font-semibold text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
                >
                  Cancel
                </button>
              )}
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
                  onClick={() => { toggleInstall(oauthListing.id); setOauthListing(null); }}
                  className="rounded-[7px] bg-[#3d8c40] px-4 py-2 text-[14px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Ecosystem;
