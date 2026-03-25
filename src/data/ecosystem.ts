import type { IconName } from '../components/Icon';

export type AppCategory = 'All apps' | 'Hiring' | 'Productivity' | 'Documents' | 'HRIS';

export interface EcosystemBundle {
  id: string;
  name: string;
  outcome: string;
  summary: string;
  value: string;
  includedApps: string[];
  accentClass: string;
}

export interface EcosystemFAQ {
  question: string;
  answer: string;
}

export interface EcosystemApp {
  id: string;
  name: string;
  category: Exclude<AppCategory, 'All apps'>;
  summary: string;
  vendor: string;
  logo: string;
  accentClass: string;
  icon: IconName;
  overview: string;
  idealFor: string;
  primaryUseCases: string[];
  dataSyncs: string[];
  setupNotes: string[];
  faq: EcosystemFAQ[];
}

export const ecosystemBundles: EcosystemBundle[] = [
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

export const ecosystemApps: EcosystemApp[] = [
  {
    id: 'greenhouse',
    name: 'Greenhouse',
    category: 'Hiring',
    summary: 'Sync candidate stages, interview plans, and offer updates with your recruiting workflow.',
    vendor: 'Applicant Tracking System',
    logo: 'GH',
    accentClass: 'bg-[#E3F7E8] text-[#1D7A3C]',
    icon: 'id-badge',
    overview: 'Greenhouse keeps applicants, interviews, and offers moving through a structured hiring process without manual status chasing across systems.',
    idealFor: 'Teams that want hiring activity in their ATS to stay visible to HR and downstream onboarding systems.',
    primaryUseCases: [
      'Keep candidate stage changes aligned with downstream HR workflows.',
      'Send offer approvals and recruiting updates to the right internal teams.',
      'Reduce duplicate entry when a candidate becomes a new hire.',
    ],
    dataSyncs: [
      'Candidate status and pipeline stage updates',
      'Interview plans and scheduled interview milestones',
      'Offer progress and hire-ready records',
      'New hire handoff details for onboarding',
    ],
    setupNotes: [
      'Recruiting operations or HR systems administrators usually own setup.',
      'Works best when your stage names and approval steps are already standardized.',
      'Confirm how rejected, withdrawn, and duplicate candidates should be handled before launch.',
    ],
    faq: [
      {
        question: 'What does this integration help with most?',
        answer: 'It is strongest when recruiting activity needs to stay connected to broader HR operations, especially during offers and onboarding handoff.',
      },
      {
        question: 'Does every Greenhouse field need to sync?',
        answer: 'No. Start with core candidate, offer, and hire data, then expand only when downstream workflows depend on more fields.',
      },
    ],
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
    overview: 'Slack pushes HR workflow notifications into the channels and direct messages where managers, recruiters, and coordinators already work, cutting follow-up time on approvals and tasks.',
    idealFor: 'Organizations that rely on Slack for day-to-day coordination and want faster response times on HR workflows.',
    primaryUseCases: [
      'Notify hiring managers when feedback or approvals are waiting.',
      'Trigger reminders during onboarding and document collection.',
      'Surface high-priority payroll or compliance checkpoints to internal teams.',
    ],
    dataSyncs: [
      'Workflow notifications and approval prompts',
      'Hiring or onboarding reminders tied to status changes',
      'User and channel routing rules for message delivery',
      'Escalation messages for stalled tasks',
    ],
    setupNotes: [
      'Set clear rules for which alerts go to channels versus direct messages.',
      'Start with a small set of high-value notifications to avoid alert fatigue.',
      'Review manager access and workspace structure before rollout.',
    ],
    faq: [
      {
        question: 'Is this mainly for communication or data sync?',
        answer: 'It is primarily a communication and workflow orchestration layer. It complements a system of record rather than replacing one.',
      },
      {
        question: 'How do teams keep Slack from becoming noisy?',
        answer: 'The most successful setups limit notifications to actions that truly need attention, such as approvals, overdue tasks, and milestone changes.',
      },
    ],
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
    overview: 'DocuSign collects signatures on offers, acknowledgments, and onboarding packets without manual tracking across inboxes or shared drives.',
    idealFor: 'Teams that need a more consistent document-signing process across recruiting, onboarding, and policy updates.',
    primaryUseCases: [
      'Send offer letters for signature directly from hiring workflows.',
      'Collect onboarding forms before start date.',
      'Track signed acknowledgments for policy or compliance records.',
    ],
    dataSyncs: [
      'Envelope status and signature completion updates',
      'Recipient and routing metadata for HR documents',
      'Signed-document references back to HR workflows',
      'Reminder or follow-up status when signatures are delayed',
    ],
    setupNotes: [
      'Standardize templates and signer roles before enabling automation.',
      'Confirm document retention expectations with legal or compliance partners.',
      'Decide where completed documents should be stored after signature.',
    ],
    faq: [
      {
        question: 'What HR moments benefit most from DocuSign?',
        answer: 'Offers, onboarding packets, and policy acknowledgments are the most common starting points because they involve repeatable signature workflows.',
      },
      {
        question: 'Can signed documents be referenced in other systems?',
        answer: 'Yes. Use the integration to bring completion status and document references back into HR workflows or document repositories.',
      },
    ],
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
    overview: 'BambooHR acts as a core HR record system for employee details, onboarding steps, and people data that other integrations depend on.',
    idealFor: 'Teams that want employee data changes to flow more consistently across tools without repeated manual updates.',
    primaryUseCases: [
      'Sync employee profile and employment details to connected systems.',
      'Coordinate onboarding task timing with employee start data.',
      'Keep people directory information aligned across apps.',
    ],
    dataSyncs: [
      'Employee demographic and job information',
      'Start dates and onboarding milestones',
      'Department, manager, and org-structure fields',
      'Employment status changes that affect downstream systems',
    ],
    setupNotes: [
      'HRIS admins should confirm source-of-truth rules before enabling syncs.',
      'It is worth reviewing which fields are authoritative in BambooHR versus in connected systems.',
      'Phase in read-only or one-way syncs before expanding to more automation.',
    ],
    faq: [
      {
        question: 'When is BambooHR the best anchor for an integration?',
        answer: 'It is a strong anchor when employee records, reporting lines, or onboarding timing need to remain consistent across several connected tools.',
      },
      {
        question: 'Should every connected tool write back to BambooHR?',
        answer: 'No. Define BambooHR as the source of truth for core employee data and limit write-back to carefully selected workflows.',
      },
    ],
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
    overview: 'Lever keeps candidate activity organized across sourcing, interviewing, and decision-making so recruiting progress is easy to track and act on.',
    idealFor: 'Recruiting teams that need better visibility into pipeline movement and cleaner coordination across hiring stakeholders.',
    primaryUseCases: [
      'Keep candidate records and stage movement visible across recruiting workflows.',
      'Support handoff from sourcing into structured interview and offer steps.',
      'Reduce lag between recruiter actions and downstream HR follow-up.',
    ],
    dataSyncs: [
      'Candidate record and opportunity updates',
      'Pipeline stage changes and recruiting milestones',
      'Interview progress and offer readiness',
      'Hiring outcomes used for downstream onboarding work',
    ],
    setupNotes: [
      'Review pipeline design and recruiter workflow before connecting Lever broadly.',
      'Integration value improves when interview stages are used consistently.',
      'Decide early how historical opportunities should be handled.',
    ],
    faq: [
      {
        question: 'How is this different from a basic recruiting export?',
        answer: 'The integration is more helpful when stage and status changes flow continuously instead of relying on occasional manual exports.',
      },
      {
        question: 'Who owns setup?',
        answer: 'Recruiting operations, HR systems, or a shared admin owner should lead setup with input from the hiring workflow stakeholders.',
      },
    ],
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
    overview: 'Google Drive gives HR teams a common place to store documents tied to recruiting, onboarding, and compliance workflows so materials are easier to locate and maintain.',
    idealFor: 'Teams that need a shared document layer for HR materials and want workflow outputs stored in a familiar workspace.',
    primaryUseCases: [
      'Save signed packets and supporting documents into organized folders.',
      'Keep policy documents and hiring kits accessible to internal teams.',
      'Connect workflow outputs to an existing document management process.',
    ],
    dataSyncs: [
      'Document references and folder destinations',
      'Signed packet storage updates',
      'Generated file outputs from HR workflows',
      'Access paths used in downstream coordination or audits',
    ],
    setupNotes: [
      'Folder design and permission rules matter before rollout.',
      'Decide which documents belong in Drive versus in an HR system of record.',
      'Align naming conventions early so documents stay easy to find during audits or employee requests.',
    ],
    faq: [
      {
        question: 'Is Google Drive the system of record?',
        answer: 'Usually not. Use it as the working document layer while keeping employee-system records and core HR status elsewhere.',
      },
      {
        question: 'What makes this integration worthwhile?',
        answer: 'It delivers the most value when teams spend too much time filing documents manually or searching across inconsistent folder structures.',
      },
    ],
  },
];

export const ecosystemCategories: AppCategory[] = ['All apps', 'Hiring', 'Productivity', 'Documents', 'HRIS'];
