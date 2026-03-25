export interface SyncRow {
  bhrField: string;
  direction: '→' | '←' | '↔';
  partnerField: string;
  status?: 'Default' | 'Optional';
}

export interface Benefit {
  title: string;
  description: string;
}

export interface Support {
  publisher: string;
  hours: string;
  phone: string;
  email: string;
  channel?: string;
}

export interface Metadata {
  title: string;
  category: string;
  integrationType: string;
  direction: string;
  syncTrigger: string;
  syncFrequency: string;
  publisher: string;
  businessSize: string;
  publicationDate: string;
  discountPackaging: string;
  planRequired?: string;
}

export interface Listing {
  id: string;
  name: string;
  category: string;
  logoInitials: string;
  logoSrc: string;
  accentClass: string;
  previewDescription: string;
  overview: string;
  benefits: Benefit[];
  dataSyncNote?: string;
  dataSync: SyncRow[] | null;
  dataSyncFreeText?: string;
  setupNote: string;
  setupSteps: string[];
  support: Support;
  metadata: Metadata;
}

export interface Bundle {
  id: string;
  name: string;
  partnerIds: string[];
}

export const listings: Listing[] = [
  {
    id: 'assembly',
    name: 'Assembly',
    category: 'Recognition & Rewards',
    logoInitials: 'AS',
    logoSrc: '/logos/assembly.png',
    accentClass: 'bg-[#E8F6D8] text-[#2f7032]',
    previewDescription:
      'Automate employee recognition and milestone rewards using real-time BambooHR data — so no birthday or work anniversary goes unnoticed.',
    overview:
      'Assembly is an employee recognition and engagement platform that connects to BambooHR to keep your team roster current. When employees are added or removed in BambooHR, Assembly updates automatically — and hire date data powers automated milestone recognition so birthdays and work anniversaries are never missed.',
    benefits: [
      {
        title: 'Automatic user management',
        description:
          'Employees added or removed in BambooHR are added or removed from Assembly automatically — no manual list management required.',
      },
      {
        title: 'Milestone recognition on autopilot',
        description:
          'Assembly uses hire date and birthday data from BambooHR to trigger anniversary and birthday recognition without any admin effort.',
      },
      {
        title: 'Selective sync options',
        description:
          'Choose to sync everyone in BambooHR, specific teams, or a manual selection — giving you control over who participates in Assembly.',
      },
      {
        title: 'Engagement without switching tools',
        description:
          'Employees can send recognition, run surveys, and manage stand-ups from within Assembly, Slack, or Microsoft Teams.',
      },
    ],
    dataSyncNote:
      'Data flows one-way from BambooHR to Assembly. The sync runs every 24 hours and also triggers on events. Admins can choose to sync all employees, specific departments, or a manual selection.',
    dataSync: [
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee ID', status: 'Default' },
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name', status: 'Default' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name', status: 'Default' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email', status: 'Default' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department', status: 'Default' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title', status: 'Default' },
      { bhrField: 'Birthdate', direction: '→', partnerField: 'Birthdate', status: 'Default' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date', status: 'Default' },
    ],
    setupNote:
      'Estimated time: 10 minutes. Requires Assembly admin access. The integration is configured from within your Assembly account.',
    setupSteps: [
      'Log into Assembly as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and click Connect.',
      'Authenticate with your BambooHR credentials.',
      'Choose your sync scope: all employees, specific teams, or a manual selection.',
      'Save — Assembly will sync on the next scheduled run and on subsequent BambooHR events.',
    ],
    support: {
      publisher: 'Assembly',
      hours: '8:00 AM – 5:00 PM PST',
      phone: '(818) 486-3588',
      email: 'support@joinassembly.com',
    },
    metadata: {
      title: 'Assembly — BambooHR Marketplace',
      category: 'Recognition & Rewards',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Event-based and scheduled',
      syncFrequency: 'Every 24 hours (plus event triggers)',
      publisher: 'Assembly',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees)',
      publicationDate: '2021-05-06',
      discountPackaging: '23% off PEPM for all BambooHR customers',
      planRequired: 'Pro',
    },
  },
  {
    id: 'breezyhr',
    name: 'BreezyHR',
    category: 'Applicant Tracking Systems',
    logoInitials: 'BR',
    logoSrc: '/logos/breezyhr.png',
    accentClass: 'bg-[#E3EEFF] text-[#1a4fad]',
    previewDescription:
      'Push candidate data from BreezyHR into BambooHR automatically when a hire is made, so new employee records are ready without manual entry.',
    overview:
      'BreezyHR is an applicant tracking system designed to streamline recruiting from job posting through to hire. The BambooHR integration sends candidate data from BreezyHR into BambooHR automatically when a candidate reaches a designated hiring stage — so new employee records are created without duplicate data entry.',
    benefits: [
      {
        title: 'Candidate data flows to BambooHR on hire',
        description:
          'When a candidate reaches the offer or hire stage in BreezyHR, their profile data is pushed to BambooHR automatically — no copy-paste required.',
      },
      {
        title: 'EEO data stays in sync',
        description:
          'Gender and ethnicity EEO fields collected during the application process transfer to BambooHR, supporting compliance reporting.',
      },
      {
        title: 'Reduce time between offer and record creation',
        description:
          'New employee records appear in BambooHR as soon as a candidate is moved to the hire stage, giving HR a head start on onboarding.',
      },
      {
        title: 'Structured hiring process',
        description:
          "BreezyHR's pipeline, scorecards, and automated candidate communications keep recruiting organised right up to the point of hire.",
      },
    ],
    dataSyncNote:
      'Data flows one-way from BreezyHR to BambooHR, triggered by a stage action in the BreezyHR pipeline. The integration is event-based, not on a schedule.',
    dataSync: [
      { bhrField: 'Profile Photo', direction: '←', partnerField: 'Profile Photo' },
      { bhrField: 'Work Phone Number', direction: '←', partnerField: 'Phone Number' },
      { bhrField: 'First Name', direction: '←', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '←', partnerField: 'Last Name' },
      { bhrField: 'Gender (EEO)', direction: '←', partnerField: 'Gender (EEO)' },
      { bhrField: 'Ethnicity (EEO)', direction: '←', partnerField: 'Ethnicity (EEO)' },
      { bhrField: 'Work Email Address', direction: '←', partnerField: 'Email Address' },
    ],
    setupNote:
      'Estimated time: 10 minutes. Requires BreezyHR admin access. The integration is configured from within your BreezyHR account.',
    setupSteps: [
      'Log into BreezyHR as an admin and navigate to Settings → Integrations.',
      'Select BambooHR from the integrations list.',
      'Authenticate with your BambooHR credentials.',
      'Choose the pipeline stage that should trigger the data push to BambooHR.',
      'Save — candidate data will flow to BambooHR automatically when candidates reach that stage.',
    ],
    support: {
      publisher: 'Breezy HR',
      hours: '8:00 AM – 8:00 PM EST',
      phone: '1-844-927-3399',
      email: 'support@breezy.hr',
    },
    metadata: {
      title: 'BreezyHR — BambooHR Marketplace',
      category: 'Applicant Tracking Systems',
      integrationType: 'One-way via API',
      direction: 'Partner App to BambooHR',
      syncTrigger: 'Event (stage action in BreezyHR pipeline)',
      syncFrequency: 'On stage action',
      publisher: 'Breezy HR',
      businessSize: 'All sizes',
      publicationDate: '2016-10-01',
      discountPackaging: 'None',
      planRequired: 'Pro',
    },
  },
  {
    id: 'clicktime',
    name: 'ClickTime',
    category: 'Time Tracking & Scheduling',
    logoInitials: 'CT',
    logoSrc: '/logos/clicktime.png',
    accentClass: 'bg-[#FFF1D6] text-[#b45300]',
    previewDescription:
      'Keep ClickTime in sync with BambooHR so employee records, time-off types, and approved leave flow automatically — without duplicate data entry.',
    overview:
      'ClickTime is a time tracking and capacity planning platform used by professional services firms, nonprofits, and governments across 70+ countries. The BambooHR integration keeps employee records and time-off data in sync automatically, so ClickTime always reflects your current workforce without manual updates.',
    benefits: [
      {
        title: 'Automatic employee sync',
        description:
          'New hires and employment changes in BambooHR flow into ClickTime automatically, eliminating duplicate data entry.',
      },
      {
        title: 'Time-off types stay aligned',
        description:
          'Time-off types and approved leave requests sync from BambooHR to ClickTime, keeping time tracking consistent with your HR policies.',
      },
      {
        title: 'Simplified offboarding',
        description:
          'Employment status changes in BambooHR update ClickTime in near real time, keeping access and records accurate when employees leave.',
      },
      {
        title: 'Assisted setup',
        description:
          "ClickTime's integration team personally helps you configure the connection, so you get it right the first time.",
      },
    ],
    dataSyncNote:
      'Data flows one-way from BambooHR to ClickTime, syncing every 5 minutes. Setup is assisted by the ClickTime integration team via a request form.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'Full Name', status: 'Default' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Full Name', status: 'Default' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email Address', status: 'Default' },
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee Number', status: 'Default' },
      { bhrField: 'Employment Status', direction: '→', partnerField: 'Employment Type', status: 'Default' },
      { bhrField: 'Time Off Type', direction: '→', partnerField: 'Leave Type', status: 'Default' },
      { bhrField: 'Approved Time Off Request', direction: '→', partnerField: 'Approved Leave Request', status: 'Default' },
    ],
    setupNote:
      'Setup is assisted by the ClickTime integration team. Submit a request via the BambooHR Marketplace and a ClickTime specialist will guide you through configuration.',
    setupSteps: [
      'Submit the integration request form via the BambooHR Marketplace listing.',
      'A ClickTime integration specialist will contact you to schedule setup.',
      'Work with the ClickTime team to authenticate and configure the connection.',
      'Review field mappings and confirm the sync is running correctly.',
      'Once complete, the integration syncs automatically every 5 minutes.',
    ],
    support: {
      publisher: 'ClickTime',
      hours: 'Monday – Friday, 9:00 AM – 5:00 PM PT',
      phone: '(415) 684-1180 option 3',
      email: 'support@clicktime.com',
    },
    metadata: {
      title: 'ClickTime — BambooHR Marketplace',
      category: 'Time Tracking & Scheduling',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Event-based',
      syncFrequency: 'Every 5 minutes',
      publisher: 'ClickTime',
      businessSize: 'All sizes',
      publicationDate: '2020-08-01',
      discountPackaging: 'None',
    },
  },
  {
    id: 'learn-amp',
    name: 'Learn Amp',
    category: 'Learning & Training',
    logoInitials: 'LA',
    logoSrc: '/logos/learn-amp.png',
    accentClass: 'bg-[#F0E8FF] text-[#6c2bd9]',
    previewDescription:
      'Sync employee records from BambooHR to Learn Amp automatically, so your learning platform always reflects your current workforce.',
    overview:
      'Learn Amp is a people development platform that combines learning, community, and talent development into a single hub. The BambooHR integration syncs employee records automatically, so new hires are onboarded into Learn Amp on or before their start date and departing employees are deactivated without manual intervention.',
    benefits: [
      {
        title: 'Automatic user provisioning',
        description:
          'New employees added in BambooHR are created in Learn Amp on or before their hire date — no manual setup required.',
      },
      {
        title: 'Automatic deactivation on departure',
        description:
          'When a termination date is set in BambooHR, Learn Amp deactivates the user automatically, keeping access clean without admin effort.',
      },
      {
        title: 'Employee-led development',
        description:
          'Learn Amp gives employees and their managers direct control over learning paths, making development more personalised and relevant.',
      },
      {
        title: 'Reduce duplicate data entry',
        description:
          'Employee records are maintained in BambooHR as the single source of truth, eliminating the need to manage users separately in Learn Amp.',
      },
    ],
    dataSyncNote:
      'Data flows one-way from BambooHR to Learn Amp, triggered by events. Hire date and termination date drive the timing of user activation and deactivation.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name', status: 'Default' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name', status: 'Default' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Work Email', status: 'Default' },
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee ID', status: 'Default' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title', status: 'Default' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department', status: 'Default' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date', status: 'Default' },
      { bhrField: 'Termination Date', direction: '→', partnerField: 'Leave Date', status: 'Default' },
    ],
    setupNote:
      'Estimated time: 10 minutes. Requires Learn Amp admin access. The integration is configured from within your Learn Amp account settings.',
    setupSteps: [
      'Log into Learn Amp as an admin and open Account Settings.',
      'Navigate to the Integrations section and select BambooHR.',
      'Authenticate with your BambooHR credentials to establish the connection.',
      'Review and confirm the field mappings.',
      'Save — the integration is active and will sync users based on hire and termination dates.',
    ],
    support: {
      publisher: 'Learn Amp',
      hours: '24/7',
      phone: '+44 20 3642 0350',
      email: 'sales@learnamp.com',
      channel: 'Existing customers: raise a query via the Learn Amp customer portal',
    },
    metadata: {
      title: 'Learn Amp — BambooHR Marketplace',
      category: 'Learning & Training',
      integrationType: 'One-way via webhooks & API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Event-based',
      syncFrequency: 'Immediately on hire; delayed until hire date for future-dated hires',
      publisher: 'Learn Amp',
      businessSize: 'Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2022-10-21',
      discountPackaging: 'None',
    },
  },
  {
    id: 'northpass',
    name: 'Northpass',
    category: 'Learning & Training',
    logoInitials: 'NP',
    logoSrc: '/logos/northpass.png',
    accentClass: 'bg-[#E0F5F5] text-[#0d7575]',
    previewDescription:
      'Sync employees from BambooHR into Northpass and automatically record training completions back in BambooHR — no manual tracking required.',
    overview:
      'Northpass is a learning management system for mid-sized businesses that makes it easy to build, deliver, and track employee training. The two-way BambooHR integration provisions learners automatically and syncs training completions back into BambooHR, giving HR a complete picture of learning progress without logging into two systems.',
    benefits: [
      {
        title: 'Automatic learner provisioning',
        description:
          'Employees added to BambooHR are created in Northpass automatically, so new hires can access training from day one.',
      },
      {
        title: 'Training completions sync back to BambooHR',
        description:
          'When an employee completes a Northpass course, the completion date updates in BambooHR — keeping training records in one place.',
      },
      {
        title: 'Access revoked on departure',
        description:
          "When an employee's status changes in BambooHR, their Northpass access is revoked automatically.",
      },
      {
        title: 'No manual course enrollment tracking',
        description:
          'Course enrollment links are generated in Northpass and surfaced in BambooHR, so managers can see training status without switching tools.',
      },
    ],
    dataSyncNote:
      'This is a two-way integration. Employee data flows from BambooHR to Northpass. Training completion data flows from Northpass back to BambooHR. Syncs run hourly.',
    dataSync: [
      { bhrField: 'Employee #', direction: '→', partnerField: 'SSO UID (unique identifier)' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email & profile avatar URL' },
      { bhrField: 'Employment Status', direction: '→', partnerField: 'Access status (active / revoked)' },
      { bhrField: 'Trainings', direction: '←', partnerField: 'BambooHR Trainings' },
      { bhrField: 'Training Link', direction: '←', partnerField: 'Course enrollment link' },
      { bhrField: 'Training Completed', direction: '←', partnerField: 'Course completed date' },
    ],
    setupNote:
      'Estimated time: 5 minutes. Requires Northpass admin access. The integration activates with a single click from within Northpass.',
    setupSteps: [
      'Log into Northpass as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and click Activate.',
      'Authenticate with your BambooHR credentials.',
      'Map your Northpass courses to BambooHR Training fields.',
      'Save — the integration syncs hourly from that point forward.',
    ],
    support: {
      publisher: 'Northpass',
      hours: '3:00 AM – 8:00 PM EST, Monday – Friday',
      phone: '(646) 895-6566',
      email: 'support@northpass.com',
    },
    metadata: {
      title: 'Northpass — BambooHR Marketplace',
      category: 'Learning & Training',
      integrationType: 'Two-way via webhooks and API',
      direction: 'Both directions (see sync table)',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Hourly',
      publisher: 'Northpass',
      businessSize: 'Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2021-05-04',
      discountPackaging: 'None',
    },
  },
  {
    id: 'primalogik',
    name: 'Primalogik',
    category: 'Performance',
    logoInitials: 'PL',
    logoSrc: '/logos/primalogik.jpg',
    accentClass: 'bg-[#EAE6FF] text-[#4c3abd]',
    previewDescription:
      'Sync employee records from BambooHR to Primalogik automatically, so performance reviews, feedback, and goals always reflect your current org structure.',
    overview:
      'Primalogik is a performance management platform that brings together appraisals, 360-degree feedback, goal tracking, and engagement surveys. The BambooHR integration keeps Primalogik in sync with your current employee roster — so reviews and feedback always route to the right people without manual list updates.',
    benefits: [
      {
        title: 'BambooHR as the system of record',
        description:
          'Employee records are created and maintained in BambooHR, and data flows to Primalogik automatically — eliminating duplicate maintenance across two systems.',
      },
      {
        title: 'Org structure stays current',
        description:
          'Department, location, and manager data sync from BambooHR to Primalogik, so performance reviews always reflect your actual org structure.',
      },
      {
        title: 'SSO included',
        description:
          'The integration enables Single Sign-On, so employees access Primalogik using their existing BambooHR credentials.',
      },
      {
        title: 'Departing employees handled automatically',
        description:
          "When a termination date is set in BambooHR, the employee's Primalogik account status updates to reflect their exit.",
      },
    ],
    dataSyncNote:
      'Data flows one-way from BambooHR to Primalogik on a 15-minute schedule. Work Email is the identifying field and must match between both systems.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email Address (identifying field)' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department' },
      { bhrField: 'Location', direction: '→', partnerField: 'Location' },
      { bhrField: 'Work Phone + Ext', direction: '→', partnerField: 'Work Phone (combined)' },
      { bhrField: 'Mobile Phone', direction: '→', partnerField: 'Mobile Phone' },
      { bhrField: 'LinkedIn', direction: '→', partnerField: 'LinkedIn Profile URL' },
      { bhrField: 'Birth Date', direction: '→', partnerField: 'Date of Birth' },
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee ID' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date' },
      { bhrField: 'Termination Date', direction: '→', partnerField: 'Exit Date' },
      { bhrField: 'Status', direction: '→', partnerField: 'Account Status' },
    ],
    setupNote:
      'Estimated time: 10 minutes. Requires Primalogik admin access. The integration is configured from within your Primalogik account.',
    setupSteps: [
      'Log into Primalogik as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and enter your BambooHR API credentials.',
      'Review the field mappings and confirm Work Email is set as the identifying field.',
      'Enable SSO if required for your organisation.',
      'Save — the integration will sync every 15 minutes from that point forward.',
    ],
    support: {
      publisher: 'Primalogik',
      hours: '9:00 AM – 5:00 PM EST, Monday – Friday',
      phone: '+1 844-360-1918 or +1 514-360-1918',
      email: 'support@primalogik.com',
    },
    metadata: {
      title: 'Primalogik — BambooHR Marketplace',
      category: 'Performance',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every 15 minutes',
      publisher: 'Primalogik',
      businessSize: 'Small (26–100 employees)',
      publicationDate: '2017-06-22',
      discountPackaging: 'None',
      planRequired: 'Pro',
    },
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Integration Platforms',
    logoInitials: 'ZP',
    logoSrc: '/logos/zapier.png',
    accentClass: 'bg-[#FFF1E8] text-[#c04f00]',
    previewDescription:
      'Connect BambooHR to 1,300+ apps and automate HR workflows across your entire tool stack — no coding required.',
    overview:
      'Zapier is a workflow automation platform that connects BambooHR to over 1,300 apps without any coding. Use pre-built Zap templates or create custom automations to trigger actions in other tools whenever something changes in BambooHR — and vice versa.',
    benefits: [
      {
        title: 'Connect BambooHR to any app',
        description:
          "Link BambooHR to Slack, Asana, Google Workspace, QuickBooks, Calendly, and 1,300+ other apps using Zapier's visual workflow builder.",
      },
      {
        title: 'No coding required',
        description:
          "Anyone on your HR team can set up automations in minutes using Zapier's point-and-click interface — no engineering support needed.",
      },
      {
        title: '20+ ready-to-use Zap templates',
        description:
          'Pre-configured Zap templates for common BambooHR use cases are available to activate immediately, including new hire notifications and onboarding checklists.',
      },
      {
        title: 'Trigger automations in both directions',
        description:
          'Automate actions in other apps when BambooHR data changes, or update BambooHR automatically when events happen in connected apps.',
      },
    ],
    dataSyncNote: null,
    dataSync: null,
    dataSyncFreeText:
      'Zapier is a platform connector — it does not sync a fixed set of fields. Instead, you configure triggers and actions based on your specific workflows. Available BambooHR triggers include new employee created, time-off request created, and company report changes. This integration uses event-based triggers rather than field-level sync.',
    setupNote:
      'Estimated time: 5–15 minutes per Zap. Requires a Zapier account and your BambooHR API key. Sync frequency depends on your Zapier plan.',
    setupSteps: [
      'Create or log into your Zapier account at zapier.com.',
      'Search for BambooHR in the Zapier app directory.',
      'Connect your BambooHR account using your BambooHR API key.',
      'Choose a pre-built Zap template or create a new Zap from scratch.',
      'Select your BambooHR trigger, configure the action in the connected app, and turn the Zap on.',
    ],
    support: {
      publisher: 'Zapier',
      hours: '24/7 via support form',
      phone: 'Not available',
      email: 'Via support form at zapier.com/app/contact',
    },
    metadata: {
      title: 'Zapier — BambooHR Marketplace',
      category: 'Integration Platforms',
      integrationType: 'Two-way via API',
      direction: 'BambooHR to Partner App (configurable)',
      syncTrigger: 'Event-based',
      syncFrequency: 'Depends on Zapier plan',
      publisher: 'Zapier',
      businessSize: 'All sizes',
      publicationDate: '2018-04-13',
      discountPackaging: 'None',
      planRequired: 'Elite',
    },
  },
];

export const bundles: Bundle[] = [
  {
    id: 'learn-grow',
    name: 'Learn & Grow',
    partnerIds: ['northpass', 'learn-amp', 'assembly'],
  },
  {
    id: 'hire-onboard',
    name: 'Hire & Onboard',
    partnerIds: ['breezyhr', 'clicktime'],
  },
  {
    id: 'automate-everything',
    name: 'Automate Everything',
    partnerIds: ['zapier', 'assembly'],
  },
];

export const listingCategories = [
  'All',
  'Recognition & Rewards',
  'Applicant Tracking Systems',
  'Time Tracking & Scheduling',
  'Learning & Training',
  'Performance',
  'Integration Platforms',
];

export function getBundlesForPartner(partnerId: string): Bundle[] {
  return bundles.filter((b) => b.partnerIds.includes(partnerId));
}
