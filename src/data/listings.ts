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

  // ── NEW LISTINGS ──────────────────────────────────────────────────────────

  {
    id: 'cyberark-identity',
    name: 'CyberArk Identity',
    category: 'Identity Management',
    logoInitials: 'CA',
    logoSrc: '/logos/cyberark.png',
    accentClass: 'bg-[#E8EEFF] text-[#1a3fad]',
    previewDescription:
      'Provision and de-provision user access across all your apps automatically using BambooHR as the system of record — with adaptive SSO and MFA included.',
    overview:
      'CyberArk Identity provides adaptive Single Sign-On and lifecycle management, using BambooHR as the system of record for user provisioning. When employee data changes in BambooHR, CyberArk Identity automatically updates or removes user accounts in connected applications — so access is always aligned with employment status.',
    benefits: [
      { title: 'BambooHR drives access provisioning', description: 'New hires in BambooHR trigger automatic account creation in connected apps. Terminations trigger immediate de-provisioning, reducing security risk from orphaned accounts.' },
      { title: 'Single sign-on across all apps', description: 'Employees use one set of credentials — protected by Adaptive MFA — to access all applications from any device, reducing password fatigue and IT overhead.' },
      { title: 'Automatic synchronization on org changes', description: 'When roles, departments, or reporting lines change in BambooHR, CyberArk Identity automatically updates user attributes and group memberships in connected applications.' },
      { title: 'Configurable sync schedule', description: 'Admins can set the frequency of incremental syncs in minutes, balancing real-time accuracy with system load.' },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to CyberArk Identity (and onwards to provisioned applications). Sync frequency is configurable — incremental syncs run automatically at the interval you define.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Middle Name', direction: '→', partnerField: 'Middle Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Work Email' },
      { bhrField: 'Mobile Phone', direction: '→', partnerField: 'Mobile Phone' },
      { bhrField: 'City', direction: '→', partnerField: 'City' },
      { bhrField: 'State', direction: '→', partnerField: 'State' },
      { bhrField: 'Zip Code', direction: '→', partnerField: 'Zip Code' },
      { bhrField: 'Employment History Status', direction: '→', partnerField: 'Employment History Status' },
    ],
    setupNote: 'Estimated time: 15–30 minutes. Requires CyberArk Identity admin access. Configuration involves defining sync schedules and mapping BambooHR roles to application entitlements.',
    setupSteps: [
      'Log into CyberArk Identity as an admin and navigate to the BambooHR connector settings.',
      'Authenticate with your BambooHR API credentials to establish the connection.',
      'Define which applications should be provisioned using BambooHR as the source.',
      'Set the incremental sync frequency in minutes to control how often user data refreshes.',
      'Run an initial full sync and verify that user accounts are created correctly in connected apps.',
    ],
    support: { publisher: 'CyberArk Identity', hours: '24/7', phone: '+1-617-663-0300', email: 'support@cyberark.com' },
    metadata: {
      title: 'CyberArk Identity — BambooHR Marketplace',
      category: 'Identity Management',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Configurable (incremental sync in minutes)',
      publisher: 'CyberArk Identity',
      businessSize: 'Large (501+ employees)',
      publicationDate: '2022-02-09',
      discountPackaging: 'None',
    },
  },

  {
    id: 'effortless-admin',
    name: 'Effortless Admin',
    category: 'Benefits Administration',
    logoInitials: 'EA',
    logoSrc: '/logos/effortless-admin.png',
    accentClass: 'bg-[#E8F4FF] text-[#1a5fad]',
    previewDescription:
      'Sync employee records from BambooHR to Effortless Admin nightly so Canadian benefits enrollment and billing always reflect your current workforce.',
    overview:
      'Effortless Admin is a Canadian benefits administration platform that consolidates multi-provider benefits plans into a single interface. The BambooHR integration syncs employee records nightly — new hires, updates, and terminations flow into Effortless Admin automatically, where changes are held in a review queue before being applied.',
    benefits: [
      { title: 'Nightly sync eliminates manual benefits updates', description: 'Employee additions, changes, and terminations in BambooHR transfer to Effortless Admin overnight, so benefits data is current each morning without manual work.' },
      { title: 'Changes reviewed before being applied', description: "Incoming changes from BambooHR are held in an 'Incoming Changes' queue in Effortless Admin, giving administrators a chance to review before committing." },
      { title: 'Compensation data syncs for accurate benefits', description: 'Pay rate, pay type, and hours per week sync from BambooHR, ensuring that benefit calculations and deductions are based on current compensation data.' },
      { title: 'One interface for all benefits providers', description: 'Regardless of how many benefits providers you use, Effortless Admin consolidates everything — and BambooHR is the data source keeping it current.' },
    ],
    dataSyncNote: "Data flows one-way from BambooHR to Effortless Admin on a nightly schedule. Note: the 'Standard Hours Per Week' field must be enabled in BambooHR for hours-per-week to sync correctly. This integration serves Canadian businesses only.",
    dataSync: [
      { bhrField: 'Employee Number', direction: '→', partnerField: 'BambooHR Employee Number' },
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Preferred Name', direction: '→', partnerField: 'Preferred Name' },
      { bhrField: 'Address Line 1', direction: '→', partnerField: 'Address' },
      { bhrField: 'City', direction: '→', partnerField: 'City' },
      { bhrField: 'Province', direction: '→', partnerField: 'Province' },
      { bhrField: 'Postal Code', direction: '→', partnerField: 'Postal Code' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Employment Date' },
      { bhrField: 'Termination Date', direction: '→', partnerField: 'Termination Date' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Work Email' },
      { bhrField: 'Gender', direction: '→', partnerField: 'Gender' },
      { bhrField: 'Birthday', direction: '→', partnerField: 'Date of Birth' },
      { bhrField: 'Pay Type', direction: '→', partnerField: 'Salary Basis' },
      { bhrField: 'Pay Rate', direction: '→', partnerField: 'Salary Amount' },
      { bhrField: 'Standard Hours per Week', direction: '→', partnerField: 'Hours per week' },
    ],
    setupNote: "Estimated time: 15 minutes. Requires Effortless Admin admin access. Ensure the Standard Hours Per Week field is enabled in BambooHR before connecting.",
    setupSteps: [
      "Enable the 'Standard Hours Per Week' field in BambooHR if not already active.",
      'Log into Effortless Admin and navigate to Settings → Integrations.',
      'Select BambooHR and enter your BambooHR API credentials.',
      'Run an initial sync to pull your current employee roster into Effortless Admin.',
      'Review the Incoming Changes queue and approve records to begin active syncing.',
    ],
    support: { publisher: 'Effortless Admin', hours: 'Monday – Friday, 8:00 AM – 5:00 PM MST', phone: '1-800-311-6932', email: 'hello@effortlessadmin.com' },
    metadata: {
      title: 'Effortless Admin — BambooHR Marketplace',
      category: 'Benefits Administration',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Nightly',
      publisher: 'Effortless Admin',
      businessSize: 'Startups (1–25 employees), Small (26–100 employees), Midsized (101–500 employees)',
      publicationDate: '2018-10-18',
      discountPackaging: 'None',
    },
  },

  {
    id: 'engagedly',
    name: 'Engagedly',
    category: 'Performance',
    logoInitials: 'EN',
    logoSrc: '/logos/engagedly.jpg',
    accentClass: 'bg-[#FFF0F0] text-[#c0392b]',
    previewDescription:
      'Sync employee records from BambooHR to Engagedly every 5 minutes so performance reviews, OKRs, and feedback always reflect your current team.',
    overview:
      'Engagedly is a talent management platform for performance management, 360 feedback, goal tracking, and recognition. The BambooHR integration syncs employee records every 5 minutes, so new hires, terminations, and org changes appear in Engagedly almost instantly — keeping reviews and feedback routed accurately.',
    benefits: [
      { title: 'Near real-time employee sync', description: 'New employees, terminations, and updates in BambooHR appear in Engagedly within 5 minutes — so reviews and check-ins are never sent to the wrong person.' },
      { title: 'Manager hierarchy stays current', description: 'The Supervisor EID from BambooHR maps to the Manager ID in Engagedly, keeping review routing and check-in structure accurate as your org evolves.' },
      { title: 'Department and location segmentation', description: 'Department and location data from BambooHR sync to Engagedly, enabling performance and engagement reports to be filtered by team and site.' },
      { title: 'Single source of record for people data', description: 'BambooHR is the system of record — Engagedly reads from it continuously, so HR only maintains employee data in one place.' },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to Engagedly, syncing every 5 minutes.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Middle Name', direction: '→', partnerField: 'Middle Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email' },
      { bhrField: 'Employee Number', direction: '→', partnerField: 'Employee ID' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Joining Date' },
      { bhrField: 'Date of Birth', direction: '→', partnerField: 'Birthdate' },
      { bhrField: 'Location', direction: '→', partnerField: 'Location' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title' },
      { bhrField: 'Department', direction: '→', partnerField: 'Departments' },
      { bhrField: 'Supervisor EID', direction: '→', partnerField: 'Manager ID' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Engagedly admin access.',
    setupSteps: [
      'Log into Engagedly as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and enter your BambooHR API credentials.',
      'Review the field mappings and confirm the Supervisor EID is correctly mapped to Manager ID.',
      'Run an initial sync to populate Engagedly with your current BambooHR roster.',
      'The integration will sync automatically every 5 minutes from that point forward.',
    ],
    support: { publisher: 'Engagedly', hours: '24/7', phone: '(650) 485-1642', email: 'support@engagedly.com' },
    metadata: {
      title: 'Engagedly — BambooHR Marketplace',
      category: 'Performance',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every 5 minutes',
      publisher: 'Engagedly',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees)',
      publicationDate: '2018-09-14',
      discountPackaging: 'None',
    },
  },

  {
    id: 'flexspring',
    name: 'Flexspring',
    category: 'Integration Platforms',
    logoInitials: 'FS',
    logoSrc: '/logos/flexspring.png',
    accentClass: 'bg-[#E8FFF0] text-[#1a8c40]',
    previewDescription:
      'Connect BambooHR to your payroll app with a custom, managed integration — new hires and employee updates sync in near real-time with no IT resources required.',
    overview:
      'Flexspring provides custom, managed integrations between BambooHR and payroll applications including ADP, Paylocity, Paychex, Paycor, UKG, and QuickBooks. The Flexspring team handles all integration work — no internal IT resources are needed — and custom connectors are deployed in 6 to 8 weeks.',
    benefits: [
      { title: 'New hires sync to payroll in near real-time', description: 'The moment a hiring manager presses the new hire button in BambooHR, new hire data automatically appears in your payroll app with everything needed to process payroll.' },
      { title: 'No internal IT resources required', description: "Flexspring's experts handle all integration work including data mapping, custom fields, and business rules — your team doesn't need to build or maintain anything." },
      { title: 'Custom fields and business rules supported', description: 'Unlike off-the-shelf connectors, Flexspring handles unique business requirements and custom fields, and can be easily upgraded as your needs change.' },
      { title: 'Broad payroll app compatibility', description: 'Flexspring connects BambooHR to ADP, Paylocity, Paychex, Paycor, UKG, QuickBooks Online, and 20+ other payroll and ERP platforms.' },
    ],
    dataSyncNote: 'This is a custom integration — synced fields are configured to match your specific business requirements. The example fields below are illustrative. Flexspring typically completes custom integrations in 6–8 weeks.',
    dataSync: [
      { bhrField: 'Employee #', direction: '↔', partnerField: 'Employee ID', status: 'Default' },
      { bhrField: 'First Name', direction: '↔', partnerField: 'First Name', status: 'Default' },
      { bhrField: 'Last Name', direction: '↔', partnerField: 'Last Name', status: 'Default' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date', status: 'Default' },
      { bhrField: 'Date of Birth', direction: '↔', partnerField: 'Birth Date', status: 'Default' },
      { bhrField: 'Job Title', direction: '↔', partnerField: 'Job Title', status: 'Default' },
      { bhrField: 'Department', direction: '↔', partnerField: 'Home Department', status: 'Default' },
      { bhrField: 'Pay Rate', direction: '↔', partnerField: 'Pay Period Pay Rate', status: 'Default' },
      { bhrField: 'SSN', direction: '→', partnerField: 'Tax ID', status: 'Default' },
    ],
    setupNote: 'Setup is managed by the Flexspring integration team. Custom integrations are typically deployed in 6–8 weeks. Contact Flexspring to discuss your specific payroll app and requirements.',
    setupSteps: [
      'Contact Flexspring via the BambooHR Marketplace to discuss your payroll app and integration needs.',
      'Flexspring will define the data map and custom business rules for your specific environment.',
      'Provide BambooHR API access to the Flexspring team for integration development.',
      'Review and approve the configured connector before go-live.',
      'Flexspring deploys and monitors the integration — typical deployment is 6–8 weeks from kickoff.',
    ],
    support: { publisher: 'Flexspring', hours: '9:00 AM – 5:00 PM ET (active integrations only)', phone: '+1 917-618-9536', email: 'sales@flexspring.com' },
    metadata: {
      title: 'Flexspring — BambooHR Marketplace',
      category: 'Integration Platforms',
      integrationType: 'One-way via API (custom)',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Event-based',
      syncFrequency: 'Near real-time',
      publisher: 'Flexspring',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2022-07-16',
      discountPackaging: 'None',
      planRequired: 'Pro',
    },
  },

  {
    id: 'greenhouse-onboarding',
    name: 'Greenhouse Onboarding',
    category: 'Onboarding',
    logoInitials: 'GH',
    logoSrc: '/logos/greenhouse-onboarding.png',
    accentClass: 'bg-[#E8F6D8] text-[#2f7032]',
    previewDescription:
      'Push completed new hire data from Greenhouse Onboarding into BambooHR automatically, so employee records are ready before day one.',
    overview:
      'Greenhouse Onboarding helps companies create a structured, consistent onboarding experience from offer acceptance through the first day. The BambooHR integration pushes new hire profile data from Greenhouse Onboarding into BambooHR automatically, eliminating duplicate data entry and ensuring employee records are complete from the start.',
    benefits: [
      { title: 'New hire data flows to BambooHR automatically', description: 'When a new hire completes onboarding in Greenhouse, their profile data is pushed to BambooHR — no manual record creation required.' },
      { title: 'Documents sync to the employee record', description: 'Any documents attached to the employee in Greenhouse Onboarding are added to their BambooHR profile under Documents, keeping everything in one place.' },
      { title: 'Consistent onboarding experience', description: "Greenhouse Onboarding's structured plans, automated tasks, and eSignature workflows ensure every new hire gets the same experience — regardless of role or location." },
      { title: 'Reduce time between offer and day one', description: 'New hires can complete paperwork, review company information, and introduce themselves before their start date, so day one is productive from the start.' },
    ],
    dataSyncNote: 'Data flows one-way from Greenhouse Onboarding to BambooHR. The sync is manually initiated — HR controls when completed new hire profiles are pushed to BambooHR.',
    dataSync: [
      { bhrField: 'First Name', direction: '←', partnerField: 'Legal First Name' },
      { bhrField: 'Last Name', direction: '←', partnerField: 'Legal Last Name' },
      { bhrField: 'Status', direction: '←', partnerField: 'User Status (Active by default)' },
      { bhrField: 'Hire Date', direction: '←', partnerField: 'Start Date' },
      { bhrField: 'Email', direction: '←', partnerField: 'Work Email Address' },
      { bhrField: 'Department', direction: '←', partnerField: 'Department' },
      { bhrField: 'Location', direction: '←', partnerField: 'Location' },
      { bhrField: 'Job Title', direction: '←', partnerField: 'Title' },
      { bhrField: 'Employment Status', direction: '←', partnerField: 'Employment Status' },
      { bhrField: 'Birth Date', direction: '←', partnerField: 'Date of Birth' },
      { bhrField: 'Profile Photo', direction: '←', partnerField: 'Profile Photo' },
      { bhrField: 'Documents', direction: '←', partnerField: 'Employee Documents' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Greenhouse Onboarding admin access and your BambooHR domain name.',
    setupSteps: [
      'Retrieve your BambooHR domain — the alphanumeric text before bamboohr.com in your account URL.',
      'Log into Greenhouse Onboarding as an admin and navigate to Settings → Integrations.',
      "Select 'Enable inline with BambooHR' and enter your BambooHR domain.",
      "Click 'Connect to BambooHR' and log in with your BambooHR credentials when prompted.",
      'Once redirected back to Greenhouse Onboarding, the integration is active.',
    ],
    support: { publisher: 'Greenhouse Onboarding', hours: '9:00 AM – 9:00 PM ET', phone: 'N/A', email: 'support@greenhouse.io' },
    metadata: {
      title: 'Greenhouse Onboarding — BambooHR Marketplace',
      category: 'Onboarding',
      integrationType: 'One-way via API',
      direction: 'Partner App to BambooHR',
      syncTrigger: 'Manually initiated',
      syncFrequency: 'On demand',
      publisher: 'Greenhouse Onboarding',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2019-03-12',
      discountPackaging: 'None',
    },
  },

  {
    id: 'hireflix',
    name: 'Hireflix',
    category: 'Video Interviews',
    logoInitials: 'HF',
    logoSrc: '/logos/hireflix.png',
    accentClass: 'bg-[#FFF4E8] text-[#c05a00]',
    previewDescription:
      'Send one-way video interview invitations to candidates directly from BambooHR and receive completed responses back — without leaving your ATS.',
    overview:
      "Hireflix adds one-way video interviewing to BambooHR's recruiting workflow. Change a candidate's status in BambooHR to trigger an interview invitation, and once the candidate responds, a link to their video appears in the BambooHR notes section — so hiring managers can review responses without switching tools.",
    benefits: [
      { title: 'Trigger video interviews from BambooHR', description: "Change a candidate's status to 'Send Hireflix Interview' and the invitation is sent automatically — no need to log into Hireflix separately." },
      { title: 'Bulk invite candidates', description: 'Send video interview invitations to multiple candidates at once by updating their statuses in bulk in BambooHR.' },
      { title: 'Review responses in BambooHR', description: 'Once a candidate completes their video interview, a link appears in the BambooHR notes section so hiring managers can watch responses without switching tools.' },
      { title: 'Automatic candidate reminders', description: "Hireflix sends automated reminders to candidates who haven't completed their interview, reducing follow-up work for recruiters." },
    ],
    dataSyncNote: 'This is a two-way integration. Candidate data and status changes flow from BambooHR to Hireflix to trigger interviews. Completed interview status and response links flow back from Hireflix to BambooHR.',
    dataSync: [
      { bhrField: 'Job ID', direction: '→', partnerField: 'position_id' },
      { bhrField: 'Application ID', direction: '→', partnerField: 'interview_id' },
      { bhrField: 'Applicant Status', direction: '↔', partnerField: 'candidate_status' },
      { bhrField: 'Applicant First Name', direction: '→', partnerField: 'candidate_first_name' },
      { bhrField: 'Applicant Last Name', direction: '→', partnerField: 'applicant_last_name' },
      { bhrField: 'Applicant Email', direction: '→', partnerField: 'candidate_email' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires a Hireflix account and BambooHR admin access.',
    setupSteps: [
      'Log into Hireflix and navigate to Settings → Integrations → BambooHR.',
      'Enter your BambooHR API key to authenticate the connection.',
      'Configure which candidate status change in BambooHR should trigger a Hireflix interview invitation.',
      'Set up your interview template in Hireflix — questions, time limits, and branding.',
      'Test with a candidate profile to confirm the trigger and response flow work correctly.',
    ],
    support: { publisher: 'Hireflix', hours: '9:00 AM – 5:00 PM EST', phone: '202-813-1933', email: 'support@hireflix.com' },
    metadata: {
      title: 'Hireflix — BambooHR Marketplace',
      category: 'Video Interviews',
      integrationType: 'Two-way via API',
      direction: 'Both directions (see sync table)',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every 5 minutes',
      publisher: 'Hireflix',
      businessSize: 'Small (26–100 employees)',
      publicationDate: '2021-03-05',
      discountPackaging: '2 months free for BambooHR customers (new Hireflix customers only)',
    },
  },

  {
    id: 'hireology',
    name: 'Hireology',
    category: 'Applicant Tracking Systems',
    logoInitials: 'HO',
    logoSrc: '/logos/hireology.png',
    accentClass: 'bg-[#E8F0FF] text-[#2a4fad]',
    previewDescription:
      'Push new hire data from Hireology directly into BambooHR when a candidate is hired — eliminating manual record creation and data entry errors.',
    overview:
      'Hireology is a talent management platform built for multi-location and owner-operated businesses. When a candidate is hired in Hireology, their profile data is pushed directly into BambooHR — so the new employee record is ready without any manual re-entry, and HR can kick off onboarding immediately.',
    benefits: [
      { title: 'New employee records created automatically', description: 'When you hire a candidate in Hireology, their name, contact details, hire date, and address transfer to BambooHR automatically — no copy-paste required.' },
      { title: 'Map roles and departments at time of hire', description: 'When hiring, existing BambooHR fields for job title, pay type, location, department, and division are presented for selection, so the record is complete from day one.' },
      { title: 'Reduce data entry errors', description: 'Candidate data entered once in Hireology flows directly to BambooHR, eliminating the risk of typos and inconsistencies from manual re-entry.' },
      { title: 'Faster onboarding kickoff', description: "With the employee record already in BambooHR, HR can begin onboarding workflows immediately after a hire is confirmed — not after someone manually creates the record." },
    ],
    dataSyncNote: 'Data flows one-way from Hireology to BambooHR, manually triggered when a candidate is hired. Job title, location, pay type, department, and division are selected from existing BambooHR fields at the time of hire.',
    dataSync: [
      { bhrField: 'First Name', direction: '←', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '←', partnerField: 'Last Name' },
      { bhrField: 'Home Email', direction: '←', partnerField: 'Email' },
      { bhrField: 'Hire Date', direction: '←', partnerField: 'Hire Date' },
      { bhrField: 'Address', direction: '←', partnerField: 'Street Address' },
      { bhrField: 'City', direction: '←', partnerField: 'City' },
      { bhrField: 'State', direction: '←', partnerField: 'State' },
      { bhrField: 'Home Phone', direction: '←', partnerField: 'Phone' },
      { bhrField: 'Pay Type', direction: '←', partnerField: 'Selected at hire from BambooHR fields' },
      { bhrField: 'Job Title', direction: '←', partnerField: 'Selected at hire from BambooHR fields' },
      { bhrField: 'Location', direction: '←', partnerField: 'Selected at hire from BambooHR fields' },
      { bhrField: 'Department', direction: '←', partnerField: 'Selected at hire from BambooHR fields' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Hireology admin access. The sync is triggered manually when a candidate is moved to hired status in Hireology.',
    setupSteps: [
      'Log into Hireology and navigate to Settings → Integrations → BambooHR.',
      'Enter your BambooHR API credentials to authenticate the connection.',
      'Verify that your BambooHR job title, location, and department fields are current.',
      'Test the integration by hiring a test candidate and confirming the record appears in BambooHR.',
      'When hiring real candidates, use the BambooHR field selectors to assign role and location at time of hire.',
    ],
    support: { publisher: 'Hireology', hours: '8:30 AM – 5:00 PM CST, Monday – Friday', phone: '800-219-6780', email: 'support@hireology.com' },
    metadata: {
      title: 'Hireology — BambooHR Marketplace',
      category: 'Applicant Tracking Systems',
      integrationType: 'One-way via API',
      direction: 'Partner App to BambooHR',
      syncTrigger: 'Manually initiated in Hireology',
      syncFrequency: 'On demand',
      publisher: 'Hireology',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees)',
      publicationDate: '2018-05-17',
      discountPackaging: 'None',
    },
  },

  {
    id: 'humanity',
    name: 'Humanity Scheduling',
    category: 'Time Tracking & Scheduling',
    logoInitials: 'HS',
    logoSrc: '/logos/humanity.jpg',
    accentClass: 'bg-[#FFF8E8] text-[#b47a00]',
    previewDescription:
      "Sync employee records and approved time-off requests from BambooHR to Humanity Scheduling — so your schedules always reflect who's actually available.",
    overview:
      'Humanity Scheduling (by TCP Software) is a cloud-based employee scheduling and time tracking platform. The BambooHR integration syncs employee names, contact details, and approved time-off requests into Humanity automatically, so schedulers always know who\'s available without manually cross-referencing two systems.',
    benefits: [
      { title: 'Employee records stay in sync', description: 'New hires, name changes, and terminations in BambooHR update Humanity automatically every hour — schedulers always work with current staff data.' },
      { title: 'Approved time off flows directly to schedules', description: "When a time-off request is approved in BambooHR, it appears in Humanity's leave and schedule views automatically — eliminating the risk of scheduling someone who's out." },
      { title: 'Terminations handled automatically', description: 'When an employee is set to inactive or deleted in BambooHR, they are disabled in Humanity so they can no longer be scheduled.' },
      { title: 'No duplicate availability management', description: "BambooHR is the system of record for leave — Humanity reads approved time-off directly, so you don't need to manage availability in two places." },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to Humanity. Employee data and approved time-off sync every hour on the hour (e.g., 1pm, 2pm, 3pm).',
    dataSync: [
      { bhrField: 'Employee ID', direction: '→', partnerField: 'Employee ID (identifying field)' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email' },
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Preferred Name', direction: '→', partnerField: 'Nick Name' },
      { bhrField: 'Mobile Phone', direction: '→', partnerField: 'Mobile Phone' },
      { bhrField: 'Status', direction: '→', partnerField: 'Status' },
      { bhrField: 'Time Off Type', direction: '→', partnerField: 'Leave Type' },
      { bhrField: 'Approved Time Off Request', direction: '→', partnerField: 'Approved Leave Request' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Humanity admin access. Employee IDs must match between BambooHR and Humanity for the integration to function correctly.',
    setupSteps: [
      'Log into Humanity as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and enter your BambooHR API credentials.',
      'Verify that Employee IDs match between the two systems — this is the identifying field.',
      'Run an initial sync to pull your current BambooHR employee roster into Humanity.',
      'Confirm that approved time-off requests are appearing correctly in the Humanity leave module.',
    ],
    support: { publisher: 'Humanity', hours: '24/7/365', phone: '(888) 973-6030', email: 'support@humanity.com' },
    metadata: {
      title: 'Humanity Scheduling — BambooHR Marketplace',
      category: 'Time Tracking & Scheduling',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every hour',
      publisher: 'Humanity',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2019-07-31',
      discountPackaging: 'None',
      planRequired: 'Pro',
    },
  },

  {
    id: 'lattice-engagement',
    name: 'Lattice Engagement',
    category: 'Engagement & Culture',
    logoInitials: 'LE',
    logoSrc: '/logos/lattice.png',
    accentClass: 'bg-[#F3E8FF] text-[#7c3bd9]',
    previewDescription:
      'Sync your BambooHR team roster into Lattice to run engagement surveys, eNPS, and pulse checks with an always-current employee list.',
    overview:
      "Lattice Engagement connects BambooHR to Lattice's engagement and culture tools, keeping your employee list and org chart in sync so survey results are always attributed to the right people and teams. The sync is manually initiated, giving HR full control over when data refreshes.",
    benefits: [
      { title: 'Employee list stays current in Lattice', description: 'Sync your BambooHR roster into Lattice so engagement surveys go to the right people — including new hires and excluding departures.' },
      { title: 'Org chart mirrors BambooHR', description: "The reporting structure from BambooHR maps to Lattice's manager hierarchy, so engagement results can be segmented by team accurately." },
      { title: 'Automatic add and remove on org changes', description: 'When employees join or leave in BambooHR, the next sync updates Lattice automatically — no manual list management.' },
      { title: 'Engagement insights tied to accurate data', description: 'With department, hire date, and manager synced from BambooHR, Lattice can segment survey results by tenure, team, and role.' },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to Lattice. The sync is manually initiated from within Lattice — HR controls when it runs.',
    dataSync: [
      { bhrField: 'Full Name', direction: '→', partnerField: 'Name' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Title' },
      { bhrField: 'Reports To', direction: '→', partnerField: 'Manager' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Start Date' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Lattice admin access. The sync is manually triggered from within your Lattice account.',
    setupSteps: [
      'Log into Lattice as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and authenticate with your BambooHR credentials.',
      'Review the field mappings and confirm the reporting structure looks correct.',
      'Run an initial sync to pull your current BambooHR roster into Lattice.',
      'From that point, manually trigger syncs from Lattice whenever your org changes significantly.',
    ],
    support: { publisher: 'Lattice', hours: '6:00 AM – 5:00 PM PST, Monday – Friday', phone: 'N/A', email: 'support@lattice.com' },
    metadata: {
      title: 'Lattice Engagement — BambooHR Marketplace',
      category: 'Engagement & Culture',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Manually initiated by user in Lattice',
      syncFrequency: 'On demand',
      publisher: 'Lattice',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2017-07-10',
      discountPackaging: '5% discount for BambooHR referred customers (new customers only)',
      planRequired: 'Elite',
    },
  },

  {
    id: 'leapsome',
    name: 'Leapsome',
    category: 'Performance',
    logoInitials: 'LS',
    logoSrc: '/logos/leapsome.png',
    accentClass: 'bg-[#E8F6F0] text-[#1a7a50]',
    previewDescription:
      'Sync employee records from BambooHR to Leapsome daily so performance reviews, engagement surveys, and OKRs always reflect your current team.',
    overview:
      'Leapsome is a people enablement platform combining performance reviews, OKRs, engagement surveys, learning, and compensation tools in one place. The BambooHR integration syncs employee records daily, automatically onboarding new hires and offboarding departures so Leapsome always reflects your current org structure.',
    benefits: [
      { title: 'Automatic onboarding and offboarding', description: 'New employees added in BambooHR are automatically onboarded in Leapsome, and employees with termination dates are offboarded — no manual list management.' },
      { title: 'Org structure stays accurate for reviews', description: 'Manager, department, and location data syncs from BambooHR to Leapsome so performance reviews and surveys always route to the right people.' },
      { title: 'Engagement surveys segmented by BambooHR data', description: "Tenure, location, gender, and department from BambooHR power Leapsome's survey segmentation, making insights more actionable." },
      { title: 'Single source of truth for people data', description: 'BambooHR acts as the system of record — Leapsome reads from it daily, so HR only maintains employee data in one place.' },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to Leapsome on a daily schedule. Employee # is the identifying field and must match between both systems.',
    dataSync: [
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee #', status: 'Default' },
      { bhrField: 'Status', direction: '→', partnerField: 'Status', status: 'Default' },
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name', status: 'Default' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name', status: 'Default' },
      { bhrField: 'Email', direction: '→', partnerField: 'Email', status: 'Default' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Job Title', status: 'Default' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date', status: 'Default' },
      { bhrField: 'Termination Date', direction: '→', partnerField: 'Termination Date', status: 'Default' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department', status: 'Default' },
      { bhrField: 'Supervisor ID', direction: '→', partnerField: 'Supervisor ID', status: 'Default' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires Leapsome admin access. Employee # must match between BambooHR and Leapsome.',
    setupSteps: [
      'Log into Leapsome as an admin and navigate to Settings → Integrations.',
      'Select BambooHR and authenticate with your BambooHR credentials.',
      'Verify that Employee # values match between the two systems.',
      'Run an initial sync to populate Leapsome with your current BambooHR roster.',
      'The integration will sync automatically each day from that point forward.',
    ],
    support: { publisher: 'Leapsome', hours: '9:00 AM – 6:00 PM EST', phone: 'Coming soon', email: 'Via contact form on leapsome.com' },
    metadata: {
      title: 'Leapsome — BambooHR Marketplace',
      category: 'Performance',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Daily',
      publisher: 'Leapsome',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2023-01-03',
      discountPackaging: 'Special partner pricing available for BambooHR customers — contact sales for details',
      planRequired: 'Pro',
    },
  },

  {
    id: 'makeshift',
    name: 'MakeShift',
    category: 'Time Tracking & Scheduling',
    logoInitials: 'MS',
    logoSrc: '/logos/makeshift.png',
    accentClass: 'bg-[#E8F8FF] text-[#0a6fa8]',
    previewDescription:
      "Sync employees from BambooHR to MakeShift so your scheduling tool always reflects your current workforce — with SSO so staff never need a separate login.",
    overview:
      "MakeShift is an employee scheduling and time tracking platform for shift-based workforces. The BambooHR integration syncs new hires and employee profile changes into MakeShift automatically, and enables SSO so employees log into MakeShift using their BambooHR credentials.",
    benefits: [
      { title: 'New hires available for scheduling immediately', description: 'When a new employee is added in BambooHR, they become available for import in MakeShift — so schedulers can add them to shifts without waiting for manual data entry.' },
      { title: 'Profile changes stay in sync automatically', description: 'Name, email, phone, and hire date changes in BambooHR sync to MakeShift automatically, so schedulers always work with accurate contact details.' },
      { title: 'SSO via BambooHR credentials', description: 'Employees and admins log into MakeShift using their BambooHR credentials, eliminating the need for separate account management.' },
      { title: 'Admin control over who is imported', description: 'Administrators have full control over which BambooHR employees are imported into MakeShift — giving flexibility for workforces with contractors or non-scheduled staff.' },
    ],
    dataSyncNote: 'Data flows one-way from BambooHR to MakeShift, syncing every minute. Admins control which BambooHR employees are imported into MakeShift.',
    dataSync: [
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee ID' },
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Middle Name', direction: '→', partnerField: 'Middle Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Best Email', direction: '→', partnerField: 'Email' },
      { bhrField: 'Work Phone', direction: '→', partnerField: 'Phone Number' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires MakeShift admin access. Contact MakeShift to initiate setup and discuss your specific configuration needs.',
    setupSteps: [
      'Contact MakeShift via the BambooHR Marketplace to start the setup process.',
      'Provide your BambooHR API credentials to the MakeShift team.',
      'Configure SSO so employees can log into MakeShift using BambooHR credentials.',
      'Select which employees to import from BambooHR into MakeShift.',
      'Verify that employee records are syncing correctly and SSO is working.',
    ],
    support: { publisher: 'AppColony', hours: '9:00 AM – 5:00 PM MST, Monday – Friday', phone: '(587) 390-2068', email: 'support@makeshift.ca' },
    metadata: {
      title: 'MakeShift — BambooHR Marketplace',
      category: 'Time Tracking & Scheduling',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every minute',
      publisher: 'AppColony',
      businessSize: 'Startups (1–25 employees), Small (26–100 employees), Midsized (101–500 employees)',
      publicationDate: '2019-07-31',
      discountPackaging: '20% off for the entire first year for new MakeShift clients',
    },
  },

  {
    id: 'nextgen-workforce',
    name: 'NextGen Workforce',
    category: 'Time Tracking & Scheduling',
    logoInitials: 'NG',
    logoSrc: '/logos/nextgen.png',
    accentClass: 'bg-[#EEF4FF] text-[#1a3fad]',
    previewDescription:
      'Sync employee data from BambooHR to NextGen Workforce and send time tracking and attendance data back — keeping payroll and HR in sync automatically.',
    overview:
      'NextGen Workforce is a cloud-based time tracking and attendance platform with biometric clocks, mobile GPS tracking, and scheduling tools. The two-way BambooHR integration syncs employee records, departments, and time-off requests from BambooHR into NextGen, and sends hours worked and attendance data back to BambooHR for payroll processing.',
    benefits: [
      { title: 'Employee data flows automatically to time clocks', description: 'Departments, job titles, pay codes, and PTO requests sync from BambooHR to NextGen and propagate to physical time clocks and mobile apps — no manual re-entry.' },
      { title: 'Hours worked sync back for payroll', description: 'Attendance records, hours worked, and pay codes flow from NextGen back to BambooHR, giving payroll everything it needs without separate exports.' },
      { title: 'GPS and geofenced attendance', description: "NextGen's mobile app enforces geofenced clock-in locations and tracks remote employee time, with results syncing to BambooHR." },
      { title: 'Plug-and-play setup', description: 'The API integration handles employee provisioning automatically — new hires in BambooHR appear in NextGen and on connected time clocks without admin intervention.' },
    ],
    dataSyncNote: 'This is a two-way integration syncing daily. Employee data flows from BambooHR to NextGen. Attendance and hours worked flow from NextGen back to BambooHR.',
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Employee #', direction: '→', partnerField: 'Employee Number' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date' },
      { bhrField: 'Department', direction: '→', partnerField: 'Department' },
      { bhrField: 'Location', direction: '→', partnerField: 'Location' },
      { bhrField: 'Pay Rate', direction: '→', partnerField: 'Rate' },
      { bhrField: 'Time Tracking ID', direction: '←', partnerField: 'NextGen Internal System ID' },
      { bhrField: 'Hours Worked', direction: '←', partnerField: 'Hours' },
      { bhrField: 'Date Hours Worked', direction: '←', partnerField: 'Date Hours Worked' },
      { bhrField: 'Pay Code', direction: '←', partnerField: 'Pay Code' },
    ],
    setupNote: 'Estimated time: 15 minutes. Requires NextGen Workforce admin access. Contact the NextGen team to initiate the integration setup.',
    setupSteps: [
      'Contact NextGen Workforce via the BambooHR Marketplace to initiate setup.',
      'Provide your BambooHR API credentials to the NextGen integration team.',
      'Configure department, pay code, and job title mappings between the two systems.',
      'Run an initial sync to populate NextGen with your current BambooHR employee roster.',
      'Verify that time clock and mobile app data is flowing back to BambooHR correctly.',
    ],
    support: { publisher: 'NextGen Workforce', hours: '9:00 AM – 6:00 PM EST and IST', phone: '408-520-9353', email: 'sales@ngworkforce.com' },
    metadata: {
      title: 'NextGen Workforce — BambooHR Marketplace',
      category: 'Time Tracking & Scheduling',
      integrationType: 'Two-way via API',
      direction: 'Both directions (see sync table)',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Daily',
      publisher: 'NextGen Workforce',
      businessSize: 'All sizes',
      publicationDate: '2022-06-08',
      discountPackaging: 'None',
    },
  },

  {
    id: 'performancepro',
    name: 'PerformancePRO',
    category: 'Performance',
    logoInitials: 'PP',
    logoSrc: '/logos/performancepro.png',
    accentClass: 'bg-[#FFF0F8] text-[#a0237a]',
    previewDescription:
      'Sync employee records from BambooHR to PerformancePRO every 15 minutes, so performance reviews, appraisers, and job details are always current.',
    overview:
      'PerformancePRO is a performance management platform designed by HR professionals for companies that need a straightforward, centralized way to run employee evaluations. The BambooHR integration syncs employee data automatically every 15 minutes, so HR never has to maintain two separate systems.',
    benefits: [
      { title: 'Employee data stays current automatically', description: 'New hires, job title changes, department moves, and terminations in BambooHR sync to PerformancePRO every 15 minutes — no manual updates required.' },
      { title: 'Appraiser assignments sync from BambooHR', description: "The 'Reports To' field in BambooHR maps to the Appraiser field in PerformancePRO, keeping review routing accurate as your org structure changes." },
      { title: 'Single sign-on included', description: 'Employees access PerformancePRO directly from within BambooHR using SSO, so they never need a separate login.' },
      { title: 'Compensation data in context', description: 'Pay type and pay rate sync from BambooHR to PerformancePRO, giving managers relevant compensation context during performance reviews.' },
    ],
    dataSyncNote: "Data flows one-way from BambooHR to PerformancePRO on a 15-minute schedule. Note: if an Employee # or Job Title is changed in either system, the corresponding field must be updated manually in the other system.",
    dataSync: [
      { bhrField: 'First Name', direction: '→', partnerField: 'First Name' },
      { bhrField: 'Middle Name', direction: '→', partnerField: 'Middle Name' },
      { bhrField: 'Last Name', direction: '→', partnerField: 'Last Name' },
      { bhrField: 'Hire Date', direction: '→', partnerField: 'Hire Date' },
      { bhrField: 'Termination Date', direction: '→', partnerField: 'Termination Date' },
      { bhrField: 'Reports To', direction: '→', partnerField: 'Appraiser' },
      { bhrField: 'Job Title', direction: '→', partnerField: 'Position' },
      { bhrField: 'Employee #', direction: '→', partnerField: 'Username' },
      { bhrField: 'Work Email', direction: '→', partnerField: 'Email Address' },
      { bhrField: 'Department', direction: '→', partnerField: 'Division' },
      { bhrField: 'Location', direction: '→', partnerField: 'Location' },
      { bhrField: 'Employment Status', direction: '→', partnerField: 'Status' },
      { bhrField: 'Pay Type', direction: '→', partnerField: 'Pay Basis' },
      { bhrField: 'Pay Rate', direction: '→', partnerField: 'Salary' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires PerformancePRO admin access. Job titles should be added to PerformancePRO before assigning them in BambooHR to avoid creating blank positions.',
    setupSteps: [
      'Log into PerformancePRO as an admin and navigate to the Integrations settings.',
      'Select BambooHR and enter your BambooHR API credentials.',
      'Review the field mappings — ensure Job Title values exist in PerformancePRO before syncing.',
      'Enable SSO if you want employees to access PerformancePRO from within BambooHR.',
      'Save — the integration syncs automatically every 15 minutes.',
    ],
    support: { publisher: 'HR Performance Solutions', hours: '9:00 AM – 6:00 PM EST, Monday – Friday', phone: '(800) 940-7522', email: 'support@hrperformancesolutions.net' },
    metadata: {
      title: 'PerformancePRO — BambooHR Marketplace',
      category: 'Performance',
      integrationType: 'One-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every 15 minutes',
      publisher: 'HR Performance Solutions',
      businessSize: 'Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2012-10-05',
      discountPackaging: 'None',
    },
  },

  {
    id: 'qualified',
    name: 'Qualified',
    category: 'Assessments',
    logoInitials: 'QF',
    logoSrc: '/logos/qualified.png',
    accentClass: 'bg-[#F0F8E8] text-[#3a7a10]',
    previewDescription:
      'Connect BambooHR job openings to Qualified coding assessments so you can automatically invite applicants to relevant skills tests based on their status.',
    overview:
      'Qualified provides developer coding assessments that test real-world programming skills rather than generic algorithms. The BambooHR integration connects job openings to assessments and automates invitations based on applicant status — so the right candidates get the right tests at the right time, without manual coordination.',
    benefits: [
      { title: 'Trigger assessments from BambooHR status changes', description: 'When an applicant reaches the right stage in BambooHR, Qualified automatically sends them an assessment invitation — no manual outreach required.' },
      { title: 'Assessment results update applicant status in BambooHR', description: 'When a candidate submits, is approved, or is rejected in Qualified, their status in BambooHR updates automatically so recruiters always have current information.' },
      { title: 'Real-world coding skills testing', description: 'Qualified uses language-specific testing frameworks rather than generic algorithmic puzzles, so assessments more closely reflect actual day-to-day work in your codebase.' },
      { title: 'Works for both hiring and internal upskilling', description: 'The same assessment platform can be used to evaluate candidates or develop existing team members, without maintaining separate tools.' },
    ],
    dataSyncNote: 'This is a two-way status-based integration syncing every 15 minutes. Applicant status in BambooHR triggers assessment invitations in Qualified, and assessment outcomes update applicant status back in BambooHR.',
    dataSync: [
      { bhrField: 'Applicant ID', direction: '→', partnerField: 'Employee ID (identifying field)' },
      { bhrField: 'Status', direction: '→', partnerField: 'Assessment Started (trigger)' },
      { bhrField: 'Status', direction: '←', partnerField: 'Assessment Submitted' },
      { bhrField: 'Status', direction: '←', partnerField: 'Candidate Approved' },
      { bhrField: 'Status', direction: '←', partnerField: 'Candidate Rejected' },
      { bhrField: 'Job Opening', direction: '→', partnerField: 'Assessment' },
    ],
    setupNote: 'Estimated time: 10 minutes. Requires a Qualified account and BambooHR admin access.',
    setupSteps: [
      'Log into Qualified and navigate to Integrations → BambooHR.',
      'Enter your BambooHR API credentials to authenticate the connection.',
      'Map each BambooHR job opening to the corresponding Qualified assessment.',
      'Configure which applicant status change should trigger an assessment invitation.',
      'Test with a sample applicant to confirm the trigger and status update flow correctly.',
    ],
    support: { publisher: 'Qualified', hours: 'Responses within 24 hours', phone: 'Email only', email: 'team@qualified.io' },
    metadata: {
      title: 'Qualified — BambooHR Marketplace',
      category: 'Assessments',
      integrationType: 'Two-way via API',
      direction: 'BambooHR to Partner App',
      syncTrigger: 'Scheduled',
      syncFrequency: 'Every 15 minutes',
      publisher: 'Qualified',
      businessSize: 'Small (26–100 employees), Midsized (101–500 employees), Large (501+ employees)',
      publicationDate: '2019-07-10',
      discountPackaging: 'None',
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
  'Applicant Tracking Systems',
  'Assessments',
  'Benefits Administration',
  'Engagement & Culture',
  'Identity Management',
  'Integration Platforms',
  'Learning & Training',
  'Onboarding',
  'Performance',
  'Recognition & Rewards',
  'Time Tracking & Scheduling',
  'Video Interviews',
];

export function getBundlesForPartner(partnerId: string): Bundle[] {
  return bundles.filter((b) => b.partnerIds.includes(partnerId));
}
