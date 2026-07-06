export type Role = "intern" | "supervisor";

export type InternTrack = "Frontend Dev" | "Backend Dev" | "QA";

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  track?: InternTrack;
  supervisorId?: string;
  avatarUrl: string;
  startDate?: string;
};

export type ToolId =
  | "hostinger-mail"
  | "productive"
  | "slack"
  | "gitlab"
  | "github-desktop"
  | "vs-code"
  | "kakitangan";

export type OnboardingStep = {
  id: ToolId;
  title: string;
  category: "Communication" | "Project Management" | "Development" | "HR";
  summary: string;
  instructions: string[];
  instructionSections?: LearningSection[];
  documents: LearningDocument[];
  links: ResourceLink[];
  codeSnippets: CodeSnippet[];
  imageUrl: string;
  estimatedMinutes: number;
};

export type LearningSection = {
  id: string;
  title: string;
  body: string;
  imageUrl?: string;
  documents?: LearningDocument[];
  codeSnippets?: CodeSnippet[];
};

export type LearningDocument = {
  id: string;
  title: string;
  type: "Guide" | "Checklist" | "Video" | "Policy";
  description: string;
};

export type ResourceLink = {
  label: string;
  url: string;
};

export type CodeSnippet = {
  title: string;
  language: "bash" | "json" | "text";
  code: string;
};

export type ProgressStatus = "not-started" | "in-progress" | "done";

export type ProgressRecord = {
  internId: string;
  stepId: ToolId;
  status: ProgressStatus;
  updatedAt?: string;
  notes?: string;
};

export type QuestionCategory =
  | "Company policy"
  | "Hostinger Mail"
  | "Productive"
  | "Slack"
  | "GitLab"
  | "GitHub Desktop"
  | "VS Code"
  | "Kakitangan";

export type QuestionStatus = "open" | "answered" | "closed";

export type Question = {
  id: string;
  internId: string;
  category: QuestionCategory;
  description: string;
  createdAt: string;
  status: QuestionStatus;
  replies: Reply[];
};

export type Reply = {
  id: string;
  supervisorId: string;
  body: string;
  imageUrl?: string;
  createdAt: string;
};

export type FAQ = {
  id: string;
  category: QuestionCategory | "General";
  question: string;
  answer: string;
};

export type Announcement = {
  id: string;
  title: string;
  body: string;
  audience: "all" | "interns" | "supervisors";
  createdAt: string;
  authorId: string;
};
