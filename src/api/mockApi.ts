import type { Announcement, FAQ, ProgressRecord, Question, User } from "../types";

export const apiRoutes = {
  auth: {
    login: "POST /api/auth/login",
    me: "GET /api/auth/me",
  },
  interns: {
    list: "GET /api/interns",
    create: "POST /api/interns",
    update: "PATCH /api/interns/:id",
    remove: "DELETE /api/interns/:id",
  },
  onboarding: {
    list: "GET /api/onboarding",
    updateProgress: "PATCH /api/onboarding/progress/:internId/:stepId",
  },
  questions: {
    list: "GET /api/questions",
    create: "POST /api/questions",
    answer: "POST /api/questions/:id/replies",
  },
  announcements: {
    list: "GET /api/announcements",
    create: "POST /api/announcements",
    remove: "DELETE /api/announcements/:id",
  },
  faq: {
    list: "GET /api/faqs",
    create: "POST /api/faqs",
    remove: "DELETE /api/faqs/:id",
  },
} as const;

export type MockDatabase = {
  users: User[];
  progressRecords: ProgressRecord[];
  questions: Question[];
  faqs: FAQ[];
  announcements: Announcement[];
};

export const mockApi = {
  listInterns: (db: MockDatabase) => db.users.filter((user) => user.role === "intern"),
  listOpenQuestions: (db: MockDatabase) => db.questions.filter((question) => question.status === "open"),
  getProgressForIntern: (db: MockDatabase, internId: string) =>
    db.progressRecords.filter((record) => record.internId === internId),
  listVisibleAnnouncements: (db: MockDatabase, role: User["role"]) =>
    db.announcements.filter((announcement) => announcement.audience === "all" || announcement.audience === `${role}s`),
};
