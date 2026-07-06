import type {
  Announcement,
  FAQ,
  OnboardingStep,
  ProgressRecord,
  Question,
  User,
} from "../types";

export const demoUsers: User[] = [
  {
    id: "sup-1",
    name: "Aina Rahman",
    email: "aina@double.my",
    password: "Supervisor@2026",
    role: "supervisor",
    avatarUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "int-1",
    name: "Daniel Tan",
    email: "daniel@double.my",
    password: "Frontend@2026",
    role: "intern",
    track: "Frontend Dev",
    supervisorId: "sup-1",
    startDate: "2026-05-04",
    avatarUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "int-2",
    name: "Sofia Lim",
    email: "sofia@double.my",
    password: "Backend@2026",
    role: "intern",
    track: "Backend Dev",
    supervisorId: "sup-1",
    startDate: "2026-05-04",
    avatarUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=160&q=80",
  },
  {
    id: "int-3",
    name: "Amir Hakim",
    email: "amir@double.my",
    password: "QA@2026",
    role: "intern",
    track: "QA",
    supervisorId: "sup-1",
    startDate: "2026-05-06",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=80",
  },
];

const rawOnboardingSteps: OnboardingStep[] = [
  {
    id: "hostinger-mail",
    title: "Hostinger Mail",
    category: "Communication",
    summary: "Set up your official email account, signature, and inbox rules.",
    estimatedMinutes: 25,
    imageUrl:
      "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Open Hostinger Webmail and sign in with your Double account.",
      "Set a professional email signature with name, role, and department.",
      "Create folders for HR, Productive, GitLab, and supervisor updates.",
      "Send a test email to your supervisor and archive the welcome message.",
    ],
    documents: [
      {
        id: "doc-mail-1",
        title: "Email etiquette guide",
        type: "Guide",
        description: "Tone, subject lines, cc/bcc, and response expectations.",
      },
      {
        id: "doc-mail-2",
        title: "Inbox setup checklist",
        type: "Checklist",
        description: "Folders, filters, signature, and mobile access.",
      },
    ],
    links: [
      { label: "Hostinger Webmail", url: "https://mail.hostinger.com" },
      { label: "Hostinger Email Help", url: "https://support.hostinger.com" },
    ],
    codeSnippets: [
      {
        title: "Suggested signature",
        language: "text",
        code: "Name Surname\nIntern, Frontend Dev\nDouble InternHub\nemail@double.my",
      },
    ],
  },
  {
    id: "productive",
    title: "Productive",
    category: "Project Management",
    summary: "Join the workspace, review assignments, and log onboarding time.",
    estimatedMinutes: 35,
    imageUrl:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Accept your Productive invitation from Hostinger Mail.",
      "Open My Work and review assigned onboarding tasks.",
      "Log time to the Intern Onboarding project at the end of each day.",
      "Use comments to ask task-specific clarification before moving work.",
    ],
    documents: [
      {
        id: "doc-prod-1",
        title: "Productive workflow guide",
        type: "Guide",
        description: "How Double uses tasks, time entries, and project views.",
      },
      {
        id: "doc-prod-2",
        title: "Time logging policy",
        type: "Policy",
        description: "When to log time and how supervisors review entries.",
      },
    ],
    links: [{ label: "Productive", url: "https://productive.io" }],
    codeSnippets: [
      {
        title: "Daily time note template",
        language: "text",
        code: "Onboarding completed:\n- Tool configured:\n- Blockers:\n- Next action:",
      },
    ],
  },
  {
    id: "slack",
    title: "Slack",
    category: "Communication",
    summary: "Join channels, set your profile, and learn support etiquette.",
    estimatedMinutes: 20,
    imageUrl:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Accept the Slack workspace invitation.",
      "Update profile photo, display name, title, and timezone.",
      "Join #interns, #engineering, #announcements, and your team channel.",
      "Post a short intro in #interns and tag your supervisor.",
    ],
    documents: [
      {
        id: "doc-slack-1",
        title: "Slack communication norms",
        type: "Guide",
        description: "Channel use, threads, mentions, and response windows.",
      },
    ],
    links: [
      { label: "Slack", url: "https://slack.com/signin" },
      {
        label: "Slack Keyboard Shortcuts",
        url: "https://slack.com/help/articles/201374536-Slack-keyboard-shortcuts",
      },
    ],
    codeSnippets: [
      {
        title: "Intro post",
        language: "text",
        code: "Hi everyone, I’m [Name], joining as a [Track] intern. I’m currently setting up my tools and excited to learn with the team.",
      },
    ],
  },
  {
    id: "gitlab",
    title: "GitLab",
    category: "Development",
    summary: "Configure source access, SSH keys, and merge request basics.",
    estimatedMinutes: 45,
    imageUrl:
      "https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Accept your GitLab invite and enable two-factor authentication.",
      "Generate an SSH key and add it to your GitLab profile.",
      "Clone the onboarding sandbox repository.",
      "Create a branch, commit a README change, and open a draft merge request.",
    ],
    documents: [
      {
        id: "doc-gitlab-1",
        title: "GitLab onboarding lab",
        type: "Guide",
        description: "Branching, commits, merge requests, and reviews.",
      },
      {
        id: "doc-gitlab-2",
        title: "Source control policy",
        type: "Policy",
        description: "Protected branches, approvals, and commit hygiene.",
      },
    ],
    links: [
      { label: "GitLab", url: "https://gitlab.com" },
      {
        label: "SSH Key Docs",
        url: "https://docs.gitlab.com/ee/user/ssh.html",
      },
    ],
    codeSnippets: [
      {
        title: "Create SSH key",
        language: "bash",
        code: 'ssh-keygen -t ed25519 -C "your.email@double.my"\ncat ~/.ssh/id_ed25519.pub',
      },
      {
        title: "Clone and branch",
        language: "bash",
        code: "git clone git@gitlab.com:double/onboarding-sandbox.git\ncd onboarding-sandbox\ngit checkout -b intern/your-name-setup",
      },
    ],
  },
  {
    id: "github-desktop",
    title: "GitHub Desktop",
    category: "Development",
    summary: "Install GitHub Desktop and learn visual commit workflows.",
    estimatedMinutes: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Install GitHub Desktop and sign in.",
      "Connect your local Git configuration.",
      "Add the onboarding sandbox repository as an existing repository.",
      "Practice branch switching, commits, and viewing diffs.",
    ],
    documents: [
      {
        id: "doc-ghd-1",
        title: "GitHub Desktop quick start",
        type: "Guide",
        description: "Desktop-based source control for first-week tasks.",
      },
    ],
    links: [
      { label: "Download GitHub Desktop", url: "https://desktop.github.com" },
    ],
    codeSnippets: [
      {
        title: "Git identity",
        language: "bash",
        code: 'git config --global user.name "Your Name"\ngit config --global user.email "your.email@double.my"',
      },
    ],
  },
  {
    id: "vs-code",
    title: "VS Code",
    category: "Development",
    summary: "Install extensions, workspace settings, and formatter defaults.",
    estimatedMinutes: 40,
    imageUrl:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Install VS Code and open the onboarding sandbox repository.",
      "Install recommended extensions for your track.",
      "Enable format on save and confirm TypeScript support works.",
      "Run the project locally and capture any setup errors in Ask.",
    ],
    documents: [
      {
        id: "doc-vscode-1",
        title: "Editor setup guide",
        type: "Guide",
        description: "Extensions, settings, terminal, and debugging basics.",
      },
    ],
    links: [
      { label: "VS Code", url: "https://code.visualstudio.com" },
      { label: "VS Code Docs", url: "https://code.visualstudio.com/docs" },
    ],
    codeSnippets: [
      {
        title: "Recommended settings",
        language: "json",
        code: '{\n  "editor.formatOnSave": true,\n  "editor.defaultFormatter": "esbenp.prettier-vscode",\n  "typescript.tsdk": "node_modules/typescript/lib"\n}',
      },
    ],
  },
  {
    id: "kakitangan",
    title: "Kakitangan",
    category: "HR",
    summary: "Complete HR profile, leave settings, and payroll documents.",
    estimatedMinutes: 30,
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    instructions: [
      "Open Kakitangan and complete your personal profile.",
      "Upload required documents requested by HR.",
      "Review leave request steps and public holiday calendar.",
      "Confirm completion with HR through Productive.",
    ],
    documents: [
      {
        id: "doc-kaki-1",
        title: "HR profile checklist",
        type: "Checklist",
        description: "Required details, emergency contact, and documents.",
      },
      {
        id: "doc-kaki-2",
        title: "Leave request policy",
        type: "Policy",
        description: "How interns request time away and notify supervisors.",
      },
    ],
    links: [{ label: "Kakitangan", url: "https://www.kakitangan.com" }],
    codeSnippets: [
      {
        title: "HR confirmation note",
        language: "text",
        code: "Hi HR team, I have completed my Kakitangan profile and uploaded the requested documents.",
      },
    ],
  },
];

export const onboardingSteps: OnboardingStep[] = rawOnboardingSteps.map(
  (step) => ({
    ...step,
    instructionSections: step.instructions.map((instruction, index) => ({
      id: `${step.id}-instruction-${index + 1}`,
      title: instruction.replace(/\.$/, ""),
      body: "Complete this action, then review any attached guide, command, screenshot, or policy note before moving on.",
      imageUrl: index === 0 ? step.imageUrl : undefined,
      documents: step.documents.filter(
        (_, documentIndex) =>
          documentIndex % step.instructions.length === index,
      ),
      codeSnippets: step.codeSnippets.filter(
        (_, snippetIndex) => snippetIndex % step.instructions.length === index,
      ),
    })),
  }),
);

export const progressRecords: ProgressRecord[] = [
  {
    internId: "int-1",
    stepId: "hostinger-mail",
    status: "done",
    updatedAt: "2026-05-04T10:20:00+08:00",
  },
  {
    internId: "int-1",
    stepId: "productive",
    status: "done",
    updatedAt: "2026-05-04T15:30:00+08:00",
  },
  {
    internId: "int-1",
    stepId: "slack",
    status: "in-progress",
    updatedAt: "2026-05-05T09:05:00+08:00",
  },
  { internId: "int-1", stepId: "gitlab", status: "not-started" },
  { internId: "int-1", stepId: "github-desktop", status: "not-started" },
  {
    internId: "int-1",
    stepId: "vs-code",
    status: "in-progress",
    updatedAt: "2026-05-05T11:12:00+08:00",
  },
  { internId: "int-1", stepId: "kakitangan", status: "not-started" },
  {
    internId: "int-2",
    stepId: "hostinger-mail",
    status: "done",
    updatedAt: "2026-05-04T10:40:00+08:00",
  },
  {
    internId: "int-2",
    stepId: "productive",
    status: "in-progress",
    updatedAt: "2026-05-04T17:10:00+08:00",
  },
  {
    internId: "int-2",
    stepId: "slack",
    status: "done",
    updatedAt: "2026-05-04T12:00:00+08:00",
  },
  {
    internId: "int-2",
    stepId: "gitlab",
    status: "in-progress",
    updatedAt: "2026-05-05T10:00:00+08:00",
  },
  { internId: "int-2", stepId: "github-desktop", status: "not-started" },
  {
    internId: "int-2",
    stepId: "vs-code",
    status: "done",
    updatedAt: "2026-05-04T16:00:00+08:00",
  },
  { internId: "int-2", stepId: "kakitangan", status: "not-started" },
  { internId: "int-3", stepId: "hostinger-mail", status: "not-started" },
  { internId: "int-3", stepId: "productive", status: "not-started" },
  { internId: "int-3", stepId: "slack", status: "not-started" },
  { internId: "int-3", stepId: "gitlab", status: "not-started" },
  { internId: "int-3", stepId: "github-desktop", status: "not-started" },
  { internId: "int-3", stepId: "vs-code", status: "not-started" },
  { internId: "int-3", stepId: "kakitangan", status: "not-started" },
];

export const questions: Question[] = [
  {
    id: "q-1",
    internId: "int-1",
    category: "VS Code",
    description: "Which formatter should I use for React TypeScript files?",
    createdAt: "2026-05-05T13:20:00+08:00",
    status: "answered",
    replies: [
      {
        id: "r-1",
        supervisorId: "sup-1",
        body: "Use Prettier for formatting and keep ESLint enabled for code quality warnings. The VS Code setup page includes the recommended settings JSON.",
        createdAt: "2026-05-05T14:05:00+08:00",
      },
    ],
  },
  {
    id: "q-2",
    internId: "int-2",
    category: "GitLab",
    description:
      "My SSH clone fails with permission denied after I added the key.",
    createdAt: "2026-05-05T10:50:00+08:00",
    status: "open",
    replies: [],
  },
];

export const faqs: FAQ[] = [
  {
    id: "faq-1",
    category: "General",
    question: "What should I complete on day one?",
    answer:
      "Finish Hostinger Mail, Slack, Productive, and the profile fields in Kakitangan first. Development tooling can continue into day two.",
  },
  {
    id: "faq-2",
    category: "Company policy",
    question: "How should I report a blocker?",
    answer:
      "Ask in the InternHub Ask page, then add a concise note to the related Productive task if it affects your deadline.",
  },
  {
    id: "faq-3",
    category: "GitLab",
    question: "Can I push directly to main?",
    answer:
      "No. Create a branch, open a merge request, and wait for review before merging.",
  },
  {
    id: "faq-3",
    category: "VS Code",
    question: "Which extensions is required to install before development?",
    answer: "You will need to install ES Lint, and Prettier extension.",
  },
];

export const announcements: Announcement[] = [
  {
    id: "ann-1",
    title: "Welcome cohort May 2026",
    body: "Please complete communication and HR setup before Friday. Supervisors will review progress every afternoon.",
    audience: "all",
    createdAt: "2026-05-04T09:00:00+08:00",
    authorId: "sup-1",
  },
  {
    id: "ann-2",
    title: "GitLab office hour",
    body: "A GitLab setup support session runs Wednesday at 3:00 PM in the engineering channel.",
    audience: "interns",
    createdAt: "2026-05-05T08:30:00+08:00",
    authorId: "sup-1",
  },
];
