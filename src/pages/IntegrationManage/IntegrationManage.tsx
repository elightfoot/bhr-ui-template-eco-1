import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { listings } from '../../data/listings';
import { useEcosystem } from '../../contexts/EcosystemContext';

// ── Mock data ────────────────────────────────────────────────────────────────

const mockEmployees = [
  { id: 'e1',  name: 'Amara Osei',       department: 'Engineering',      status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e2',  name: 'Ben Nakamura',     department: 'Product',          status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e3',  name: 'Clara Mendez',     department: 'People Ops',       status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e4',  name: 'David Okonkwo',    department: 'Engineering',      status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e5',  name: 'Elena Vasquez',    department: 'Sales',            status: 'pending', lastSynced: '—' },
  { id: 'e6',  name: 'Felix Huang',      department: 'Finance',          status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e7',  name: 'Grace Adeyemi',    department: 'Marketing',        status: 'error',   lastSynced: '3 hrs ago' },
  { id: 'e8',  name: 'Hiro Tanaka',      department: 'Engineering',      status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e9',  name: 'Isabel Torres',    department: 'Customer Success', status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e10', name: 'James Whitfield',  department: 'Legal',            status: 'pending', lastSynced: '—' },
  { id: 'e11', name: 'Keiko Mori',       department: 'Product',          status: 'synced',  lastSynced: '2 min ago' },
  { id: 'e12', name: 'Luca Bianchi',     department: 'Engineering',      status: 'synced',  lastSynced: '2 min ago' },
];

const mockSyncLog = [
  { id: 's1', time: 'Today, 9:41 AM',    event: 'Sync completed',              detail: '247 records updated successfully.',      type: 'success' },
  { id: 's2', time: 'Today, 9:41 AM',    event: 'Sync error — Grace Adeyemi',  detail: 'Employee record missing required field: job_code.', type: 'error' },
  { id: 's3', time: 'Today, 8:41 AM',    event: 'Sync completed',              detail: '246 records updated successfully.',      type: 'success' },
  { id: 's4', time: 'Today, 7:41 AM',    event: 'Sync completed',              detail: '246 records updated successfully.',      type: 'success' },
  { id: 's5', time: 'Yesterday, 5:30 PM', event: 'Connection re-authorized',   detail: 'OAuth token refreshed automatically.',   type: 'info' },
  { id: 's6', time: 'Yesterday, 4:41 PM', event: 'Sync completed',             detail: '244 records updated successfully.',      type: 'success' },
];

const mockFieldMappings = [
  { bhr: 'First Name',        partner: 'first_name',    direction: '→', active: true },
  { bhr: 'Last Name',         partner: 'last_name',     direction: '→', active: true },
  { bhr: 'Work Email',        partner: 'email',         direction: '→', active: true },
  { bhr: 'Department',        partner: 'department',    direction: '→', active: true },
  { bhr: 'Job Title',         partner: 'title',         direction: '→', active: true },
  { bhr: 'Employment Status', partner: 'status',        direction: '→', active: true },
  { bhr: 'Start Date',        partner: 'hire_date',     direction: '→', active: false },
  { bhr: 'Manager',           partner: 'manager_email', direction: '→', active: false },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-5">
      <p className="text-[12px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">{label}</p>
      <p className={`text-[28px] font-bold leading-none ${accent ?? 'text-[var(--text-neutral-xx-strong)]'}`}>{value}</p>
      {sub && <p className="text-[12px] text-[var(--text-neutral-medium)]">{sub}</p>}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'synced')  return <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf4ea] px-2.5 py-0.5 text-[12px] font-semibold text-[#2f7032]"><span className="h-1.5 w-1.5 rounded-full bg-[#3d8c40]" />Synced</span>;
  if (status === 'error')   return <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-0.5 text-[12px] font-semibold text-red-600"><span className="h-1.5 w-1.5 rounded-full bg-red-500" />Error</span>;
  return <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--surface-neutral-x-weak)] px-2.5 py-0.5 text-[12px] font-semibold text-[var(--text-neutral-medium)]"><span className="h-1.5 w-1.5 rounded-full bg-[var(--border-neutral-medium)]" />Pending</span>;
}

type NavSection = 'overview' | 'employees' | 'activity' | 'fields';

// ── Main component ───────────────────────────────────────────────────────────

export function IntegrationManage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleInstall } = useEcosystem();
  const [section, setSection] = useState<NavSection>('overview');
  const [employeeFilter, setEmployeeFilter] = useState('');

  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    return (
      <div className="flex h-full flex-col overflow-y-auto bg-[var(--surface-neutral-xx-weak)] px-8 py-10">
        <button type="button" onClick={() => navigate('/ecosystem')} className="mb-6 flex items-center gap-1.5 text-[13px] font-medium text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Ecosystem Hub
        </button>
        <p className="text-[16px] text-[var(--text-neutral-x-strong)]">Integration not found.</p>
      </div>
    );
  }

  const syncedCount  = mockEmployees.filter((e) => e.status === 'synced').length;
  const errorCount   = mockEmployees.filter((e) => e.status === 'error').length;
  const pendingCount = mockEmployees.filter((e) => e.status === 'pending').length;

  const filteredEmployees = mockEmployees.filter((e) =>
    !employeeFilter || e.name.toLowerCase().includes(employeeFilter.toLowerCase()) || e.department.toLowerCase().includes(employeeFilter.toLowerCase())
  );

  const navItems: { id: NavSection; label: string }[] = [
    { id: 'overview',   label: 'Overview' },
    { id: 'employees',  label: `Employees (${mockEmployees.length})` },
    { id: 'activity',   label: 'Sync activity' },
    { id: 'fields',     label: 'Field mappings' },
  ];

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

        {/* Page header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-white p-2">
              <img src={listing.logoSrc} alt={`${listing.name} logo`} className="h-full w-full object-contain" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-[28px] font-semibold leading-tight text-[var(--color-primary-strong)]" style={{ fontFamily: 'Fields, system-ui, sans-serif' }}>
                  {listing.name}
                </h1>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf4ea] px-2.5 py-1 text-[12px] font-semibold text-[#2f7032]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3d8c40]" />
                  Healthy
                </span>
              </div>
              <p className="mt-0.5 text-[13px] text-[var(--text-neutral-medium)]">
                {listing.category} · Last synced 2 min ago · {listing.metadata.syncFrequency}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate(`/ecosystem/apps/${listing.id}`)}
              className="rounded-[7px] border border-[var(--border-neutral-medium)] px-4 py-2 text-[13px] font-medium text-[var(--text-neutral-x-strong)] hover:bg-[var(--surface-neutral-x-weak)]"
            >
              View listing
            </button>
            <button
              type="button"
              onClick={() => { toggleInstall(listing.id); navigate('/ecosystem'); }}
              className="rounded-[7px] border border-[var(--border-neutral-medium)] px-4 py-2 text-[13px] font-medium text-[var(--text-neutral-x-strong)] hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              Disconnect
            </button>
          </div>
        </div>

        {/* Section nav */}
        <div className="mb-6 border-b border-[var(--border-neutral-x-weak)]">
          <div className="flex items-end gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={`border-b-2 pb-3 text-[14px] font-semibold transition-colors ${
                  section === item.id
                    ? 'border-[#3d8c40] text-[#3d8c40]'
                    : 'border-transparent text-[var(--text-neutral-medium)] hover:text-[var(--text-neutral-x-strong)]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── OVERVIEW ── */}
        {section === 'overview' && (
          <div className="flex flex-col gap-6">
            {/* Stats row */}
            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
              <StatCard label="Records synced" value="247" sub="Active employees" />
              <StatCard label="Sync errors" value={String(errorCount)} sub="Needs attention" accent={errorCount > 0 ? 'text-red-600' : undefined} />
              <StatCard label="Pending" value={String(pendingCount)} sub="Awaiting first sync" />
              <StatCard label="Uptime" value="99.8%" sub="Last 30 days" accent="text-[#2f7032]" />
            </div>

            {/* Status + recent activity side by side */}
            <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
              {/* Recent sync log */}
              <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
                <h2 className="mb-4 text-[16px] font-semibold text-[var(--text-neutral-xx-strong)]">Recent sync activity</h2>
                <div className="flex flex-col divide-y divide-[var(--border-neutral-x-weak)]">
                  {mockSyncLog.slice(0, 4).map((entry) => (
                    <div key={entry.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                      <div className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                        entry.type === 'success' ? 'bg-[#eaf4ea]' :
                        entry.type === 'error'   ? 'bg-red-50' :
                        'bg-blue-50'
                      }`}>
                        {entry.type === 'success' && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5L10 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                        {entry.type === 'error'   && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 3v3.5M6 8.5v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                        {entry.type === 'info'    && <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 5v4M6 3.5v.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold text-[var(--text-neutral-xx-strong)]">{entry.event}</p>
                        <p className="text-[12px] text-[var(--text-neutral-medium)]">{entry.detail}</p>
                      </div>
                      <p className="shrink-0 text-[11px] text-[var(--text-neutral-medium)]">{entry.time}</p>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setSection('activity')}
                  className="mt-4 text-[13px] font-medium text-[#3d8c40] hover:text-[#2f7032]"
                >
                  View full log →
                </button>
              </div>

              {/* Connection details */}
              <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)] p-6">
                <h2 className="mb-4 text-[16px] font-semibold text-[var(--text-neutral-xx-strong)]">Connection details</h2>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Status',           value: 'Active' },
                    { label: 'Connected by',      value: 'Alex Rivera' },
                    { label: 'Connected on',      value: 'Mar 15, 2026' },
                    { label: 'Token expires',     value: 'Apr 15, 2026' },
                    { label: 'Sync frequency',    value: listing.metadata.syncFrequency },
                    { label: 'Data direction',    value: listing.metadata.direction },
                    { label: 'Integration type',  value: listing.metadata.integrationType },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 border-b border-[var(--border-neutral-x-weak)] pb-3 last:border-0 last:pb-0">
                      <p className="text-[12px] text-[var(--text-neutral-medium)]">{row.label}</p>
                      <p className="text-right text-[12px] font-medium text-[var(--text-neutral-x-strong)]">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── EMPLOYEES ── */}
        {section === 'employees' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="relative w-full sm:w-[280px]">
                <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-[var(--icon-neutral-medium)]">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </span>
                <input
                  type="text"
                  value={employeeFilter}
                  onChange={(e) => setEmployeeFilter(e.target.value)}
                  placeholder="Search employees"
                  className="h-9 w-full rounded-[7px] border border-[var(--border-neutral-medium)] bg-[var(--surface-neutral-white)] pl-8 pr-3 text-[14px] text-[var(--text-neutral-x-strong)] placeholder:text-[var(--text-neutral-medium)] focus:border-[#3d8c40] focus:outline-none"
                />
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[var(--text-neutral-medium)]">
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#3d8c40]" />{syncedCount} synced</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-500" />{errorCount} error</span>
                <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[var(--border-neutral-medium)]" />{pendingCount} pending</span>
              </div>
            </div>

            <div className="overflow-hidden rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)]">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Employee</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Department</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Sync status</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Last synced</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                  {filteredEmployees.map((emp) => (
                    <tr key={emp.id} className="hover:bg-[var(--surface-neutral-xx-weak)]">
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#eaf4ea] text-[11px] font-bold text-[#2f7032]">
                            {emp.name.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <span className="font-medium text-[var(--text-neutral-xx-strong)]">{emp.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3 text-[var(--text-neutral-x-strong)]">{emp.department}</td>
                      <td className="px-5 py-3"><StatusBadge status={emp.status} /></td>
                      <td className="px-5 py-3 text-[var(--text-neutral-medium)]">{emp.lastSynced}</td>
                      <td className="px-5 py-3 text-right">
                        {emp.status === 'error' && (
                          <button type="button" className="text-[12px] font-medium text-red-600 hover:underline">
                            Retry sync
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredEmployees.length === 0 && (
                <div className="px-5 py-10 text-center text-[14px] text-[var(--text-neutral-medium)]">No employees match your search.</div>
              )}
            </div>
          </div>
        )}

        {/* ── SYNC ACTIVITY ── */}
        {section === 'activity' && (
          <div className="flex flex-col gap-4">
            <div className="rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]">
              <div className="divide-y divide-[var(--border-neutral-x-weak)]">
                {mockSyncLog.map((entry) => (
                  <div key={entry.id} className="flex items-start gap-4 px-6 py-4">
                    <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      entry.type === 'success' ? 'bg-[#eaf4ea]' :
                      entry.type === 'error'   ? 'bg-red-50' :
                      'bg-blue-50'
                    }`}>
                      {entry.type === 'success' && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2 6.5l3 3L11 3" stroke="#2f7032" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                      {entry.type === 'error'   && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 3.5v4M6.5 9v.5" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                      {entry.type === 'info'    && <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 5.5v4M6.5 4v.5" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[14px] font-semibold text-[var(--text-neutral-xx-strong)]">{entry.event}</p>
                      <p className="mt-0.5 text-[13px] text-[var(--text-neutral-medium)]">{entry.detail}</p>
                    </div>
                    <p className="shrink-0 pt-0.5 text-[12px] text-[var(--text-neutral-medium)]">{entry.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── FIELD MAPPINGS ── */}
        {section === 'fields' && (
          <div className="flex flex-col gap-4">
            <p className="text-[14px] text-[var(--text-neutral-medium)]">
              Configure which BambooHR fields are sent to {listing.name}. Active fields sync on every run.
            </p>
            <div className="overflow-hidden rounded-[12px] border border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-white)]">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[var(--border-neutral-x-weak)] bg-[var(--surface-neutral-xx-weak)]">
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">BambooHR field</th>
                    <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Direction</th>
                    <th className="px-5 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">{listing.name} field</th>
                    <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.07em] text-[var(--text-neutral-medium)]">Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-neutral-x-weak)]">
                  {mockFieldMappings.map((row) => (
                    <tr key={row.bhr} className="hover:bg-[var(--surface-neutral-xx-weak)]">
                      <td className="px-5 py-3 font-medium text-[var(--text-neutral-xx-strong)]">{row.bhr}</td>
                      <td className="px-5 py-3 text-center">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#eaf4ea] text-[13px] font-bold text-[#3d8c40]">{row.direction}</span>
                      </td>
                      <td className="px-5 py-3 font-mono text-[12px] text-[var(--text-neutral-x-strong)]">{row.partner}</td>
                      <td className="px-5 py-3 text-right">
                        <button
                          type="button"
                          className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${row.active ? 'bg-[#3d8c40]' : 'bg-[var(--border-neutral-medium)]'}`}
                        >
                          <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform ${row.active ? 'translate-x-4' : 'translate-x-1'}`} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default IntegrationManage;
