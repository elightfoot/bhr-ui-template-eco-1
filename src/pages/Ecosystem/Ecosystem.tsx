import { useMemo, useState } from 'react';
import { Button, Icon, TextHeadline } from '../../components';

type DirectoryView = 'all' | 'bundles' | 'apps';
type AppCategory = 'All apps' | 'Hiring' | 'Productivity' | 'Documents' | 'HRIS';

interface AppListing {
  id: string;
  name: string;
  category: Exclude<AppCategory, 'All apps'>;
  summary: string;
  vendor: string;
  logo: string;
  accentClass: string;
  icon: 'id-badge' | 'bell' | 'file-lines' | 'circle-user' | 'user-group' | 'link';
}

interface Bundle {
  id: string;
  name: string;
  outcome: string;
  summary: string;
  value: string;
  includedApps: string[];
  accentClass: string;
}

const bundles: Bundle[] = [
  {
    id: 'hire-faster',
    name: 'Hire Faster',
    outcome: 'Reduce delays from first review to signed offer',
    summary: 'Connect recruiting, notifications, signatures, and scheduling so handoffs stay visible and fewer steps happen in email.',
    value: 'Best for teams that want a tighter recruiting handoff across recruiters, hiring managers, and candidates.',
    includedApps: ['Greenhouse', 'Slack', 'DocuSign', 'Calendly'],
    accentClass: 'bg-[#E8F6D8] text-[var(--color-primary-strong)]',
  },
  {
    id: 'onboard-confidently',
    name: 'Onboard Confidently',
    outcome: 'Standardize preboarding and day-one setup',
    summary: 'Bundle document collection, provisioning requests, and HR record sync so each new hire follows the same operational checklist.',
    value: 'Useful when IT, People Ops, and managers need a more consistent onboarding sequence.',
    includedApps: ['BambooHR', 'DocuSign', 'Jira Service Management', 'Slack'],
    accentClass: 'bg-[#FFF3DB] text-[#8B5E00]',
  },
  {
    id: 'stay-audit-ready',
    name: 'Stay Audit-Ready',
    outcome: 'Keep records, approvals, and payroll changes aligned',
    summary: 'Bring HR records, signed documents, and payroll updates into a cleaner operating trail that is easier to review later.',
    value: 'Helpful when policy updates or payroll adjustments need supporting documentation.',
    includedApps: ['ADP', 'DocuSign', 'Google Drive', 'BambooHR'],
    accentClass: 'bg-[#E4F0FF] text-[#0B4FD1]',
  },
];

const appListings: AppListing[] = [
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    category: 'Hiring',
    summary: 'Sync candidate stages, interview plans, and offer updates with your recruiting workflow.',
    vendor: 'Applicant Tracking System',
    logo: 'GH',
    accentClass: 'bg-[#E3F7E8] text-[#1D7A3C]',
    icon: 'id-badge',
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Productivity',
    summary: 'Notify hiring teams, launch approvals, and send workflow nudges where people already collaborate.',
    vendor: 'Team Communication',
    logo: 'S',
    accentClass: 'bg-[#F4E7FF] text-[#6C2BD9]',
    icon: 'bell',
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    category: 'Documents',
    summary: 'Route offer letters, onboarding packets, and policy acknowledgments for fast signature collection.',
    vendor: 'E-signature',
    logo: 'DS',
    accentClass: 'bg-[#FFF1D6] text-[#B46A00]',
    icon: 'file-lines',
  },
  {
    id: 'bamboohr',
    name: 'BambooHR',
    category: 'HRIS',
    summary: 'Keep core employee records, onboarding tasks, and directory data aligned across systems.',
    vendor: 'Core HR',
    logo: 'BH',
    accentClass: 'bg-[#E7F6DA] text-[var(--color-primary-strong)]',
    icon: 'circle-user',
  },
  {
    id: 'lever',
    name: 'Lever',
    category: 'Hiring',
    summary: 'Coordinate sourcing and pipeline activity while preserving visibility into candidate momentum.',
    vendor: 'Talent Acquisition',
    logo: 'LV',
    accentClass: 'bg-[#E6F3FF] text-[#0B4FD1]',
    icon: 'user-group',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    category: 'Documents',
    summary: 'Store signed documents, policy packs, and interview kits in a searchable shared workspace.',
    vendor: 'Document Storage',
    logo: 'GD',
    accentClass: 'bg-[#E9F7FF] text-[#006494]',
    icon: 'link',
  },
];

const categories: AppCategory[] = ['All apps', 'Hiring', 'Productivity', 'Documents', 'HRIS'];

export function Ecosystem() {
  const [view, setView] = useState<DirectoryView>('apps');
  const [activeCategory, setActiveCategory] = useState<AppCategory>('All apps');

  const visibleApps = useMemo(() => {
    if (activeCategory === 'All apps') {
      return appListings;
    }

    return appListings.filter((app) => app.category === activeCategory);
  }, [activeCategory]);

  const showBundles = view === 'bundles';
  const showApps = view === 'apps';

  return (
    <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)]">
      <div className="flex flex-col gap-8 px-8 py-10 pr-10">
        <section className="rounded-[var(--radius-medium)] bg-[var(--surface-neutral-white)] px-8 py-8 shadow-[1px_1px_0px_2px_rgba(56,49,47,0.03)]">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[var(--surface-neutral-x-weak)] px-4 py-2 text-[13px] font-semibold text-[var(--text-neutral-x-strong)]">
                <Icon name="puzzle-piece" size={14} className="text-[var(--color-primary-strong)]" />
                <span>Ecosystem directory</span>
              </div>
              <TextHeadline size="large" color="primary">
                Manage integrations and workflow bundles
              </TextHeadline>
              <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[var(--text-neutral-x-strong)]">
                Discover integrations quickly and review curated bundles that help HR teams move faster on hiring, onboarding, and compliance work.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" icon="circle-plus">
                Add integration
              </Button>
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius-medium)] bg-[var(--surface-neutral-white)] px-6 py-5 shadow-[1px_1px_0px_2px_rgba(56,49,47,0.03)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'apps', label: 'Apps' },
                { id: 'bundles', label: 'Bundles' },
              ].map((option) => {
                const isActive = view === option.id;

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setView(option.id as DirectoryView)}
                    className={`
                      rounded-[10px] border px-3 py-2 text-[13px] font-semibold transition-colors
                      ${isActive
                        ? 'border-[var(--color-primary-strong)] bg-[var(--surface-neutral-x-weak)] text-[var(--color-primary-strong)]'
                        : 'border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                      }
                    `}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`
                      rounded-[10px] border px-3 py-2 text-[13px] font-medium transition-colors
                      ${isActive
                        ? 'border-[var(--color-primary-strong)] bg-[var(--surface-neutral-x-weak)] text-[var(--color-primary-strong)]'
                        : 'border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-xx-weak)]'
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {showBundles && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2
                  className="text-[28px] font-semibold text-[var(--color-primary-strong)]"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '36px' }}
                >
                  Outcome bundles
                </h2>
                <p className="mt-1 text-[15px] text-[var(--text-neutral-x-strong)]">
                  Start from a specific HR outcome and review the integrations commonly paired to support it.
                </p>
              </div>
            </div>

            <div className="grid gap-5 xl:grid-cols-3">
              {bundles.map((bundle) => (
                <article
                  key={bundle.id}
                  className="rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6 shadow-[1px_1px_0px_2px_rgba(56,49,47,0.03)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className={`inline-flex rounded-full px-3 py-1 text-[12px] font-semibold ${bundle.accentClass}`}>
                        Bundle
                      </div>
                      <h3 className="mt-4 text-[24px] font-semibold leading-8 text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                        {bundle.name}
                      </h3>
                      <p className="mt-2 text-[15px] leading-6 text-[var(--text-neutral-x-strong)]">
                        {bundle.outcome}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[var(--surface-neutral-x-weak)]">
                      <Icon name="bullseye" size={22} className="text-[var(--color-primary-strong)]" />
                    </div>
                  </div>

                  <p className="mt-5 text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">
                    {bundle.summary}
                  </p>

                  <div className="mt-5 rounded-[var(--radius-small)] bg-[var(--surface-neutral-xx-weak)] px-4 py-4">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-neutral-medium)]">
                      Operational fit
                    </p>
                    <p className="mt-2 text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">
                      {bundle.value}
                    </p>
                  </div>

                  <div className="mt-5">
                    <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--text-neutral-medium)]">
                      Included apps
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {bundle.includedApps.map((app) => (
                        <span
                          key={app}
                          className="inline-flex items-center rounded-[10px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] px-3 py-1.5 text-[13px] font-medium text-[var(--text-neutral-x-strong)]"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="primary" size="small">
                      Open bundle
                    </Button>
                    <Button variant="standard" size="small" icon="link">
                      View apps
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {showApps && (
          <section>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2
                  className="text-[28px] font-semibold text-[var(--color-primary-strong)]"
                  style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '36px' }}
                >
                  App directory
                </h2>
                <p className="mt-1 text-[15px] text-[var(--text-neutral-x-strong)]">
                  Browse the app directory to find the integrations that fit your HR systems and workflows.
                </p>
              </div>
              <p className="text-[14px] font-medium text-[var(--text-neutral-medium)]">
                Showing {visibleApps.length} app{visibleApps.length === 1 ? '' : 's'}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {visibleApps.map((app) => (
                <article
                  key={app.id}
                  className="rounded-[var(--radius-medium)] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6 shadow-[1px_1px_0px_2px_rgba(56,49,47,0.03)]"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-[18px] text-[18px] font-bold ${app.accentClass}`}>
                      {app.logo}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[20px] font-semibold text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif', lineHeight: '28px' }}>
                          {app.name}
                        </h3>
                        <span className="rounded-[8px] bg-[var(--surface-neutral-x-weak)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-neutral-medium)]">
                          {app.category}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] font-medium text-[var(--text-neutral-medium)]">
                        {app.vendor}
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-[14px] leading-6 text-[var(--text-neutral-x-strong)]">
                    {app.summary}
                  </p>

                  <div className="mt-5 flex items-center gap-2 text-[14px] font-medium text-[var(--text-neutral-x-strong)]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--surface-neutral-x-weak)]">
                      <Icon name={app.icon} size={16} className="text-[var(--color-primary-strong)]" />
                    </div>
                    <span>Commonly used in hiring and onboarding workflows</span>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Button variant="standard" size="small">
                      View app
                    </Button>
                    <Button variant="ghost" size="small" icon="circle-plus">
                      Add to bundle
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default Ecosystem;
