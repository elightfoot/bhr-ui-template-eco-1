import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listings, listingCategories, type Listing } from '../../data/listings';

type PartnerType = 'All types' | 'One-way sync' | 'Two-way sync' | 'Platform connector';

const partnerTypes: PartnerType[] = ['All types', 'One-way sync', 'Two-way sync', 'Platform connector'];

function getPartnerType(listing: Listing): PartnerType {
  const type = listing.metadata.integrationType.toLowerCase();
  if (type.includes('two-way')) return 'Two-way sync';
  if (type.includes('one-way')) return 'One-way sync';
  return 'Platform connector';
}

export function Ecosystem() {
  const navigate = useNavigate();
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [partnerType, setPartnerType] = useState<PartnerType>('All types');

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

  function toggleInstall(id: string) {
    setInstalledIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)]">
      <div className="flex flex-col gap-8 px-8 py-10 pr-10">
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

        {/* Filter bar */}
        <section className="flex flex-wrap items-end gap-3">
          {/* Search */}
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

          {/* Category dropdown */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-9 appearance-none rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-3 pr-8 text-[14px] text-[var(--text-neutral-x-strong)] focus:border-[#3d8c40] focus:outline-none"
            >
              {listingCategories.map((c) => (
                <option key={c} value={c}>
                  {c === 'All' ? 'All categories' : c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--icon-neutral-medium)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          {/* Partner type dropdown */}
          <div className="relative">
            <select
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value as PartnerType)}
              className="h-9 appearance-none rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-3 pr-8 text-[14px] text-[var(--text-neutral-x-strong)] focus:border-[#3d8c40] focus:outline-none"
            >
              {partnerTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-[var(--icon-neutral-medium)]">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </div>

          <p className="ml-auto text-[13px] text-[var(--text-neutral-medium)]">
            {visibleListings.length} integration{visibleListings.length !== 1 ? 's' : ''}
          </p>
        </section>

        {/* Card grid */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleListings.map((listing) => {
            const installed = installedIds.has(listing.id);
            return (
              <article
                key={listing.id}
                className="group flex flex-col rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5 transition-shadow hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]"
              >
                {/* Logo + name */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-[var(--border-neutral-x-weak)] bg-white p-1.5">
                    <img
                      src={listing.logoSrc}
                      alt={`${listing.name} logo`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[16px] font-semibold text-[var(--text-neutral-xx-strong)]">
                      {listing.name}
                    </p>
                    <span className="inline-block rounded-[6px] bg-[var(--surface-neutral-x-weak)] px-2 py-0.5 text-[11px] font-medium text-[var(--text-neutral-medium)]">
                      {listing.category}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 flex-1 text-[13px] leading-5 text-[var(--text-neutral-x-strong)]">
                  {listing.previewDescription}
                </p>

                {/* Actions */}
                <div className="mt-4 flex items-center gap-3">
                  {installed ? (
                    <span className="inline-flex items-center gap-1.5 rounded-[7px] bg-[#eaf4ea] px-3 py-1.5 text-[13px] font-semibold text-[#2f7032]">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6L5 9L10 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Installed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => toggleInstall(listing.id)}
                      className="rounded-[7px] bg-[#3d8c40] px-3 py-1.5 text-[13px] font-semibold text-white transition-colors hover:bg-[#2f7032]"
                    >
                      Install
                    </button>
                  )}
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
            <p className="mt-2 text-[14px] text-[var(--text-neutral-medium)]">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Ecosystem;
