import { createSlice, nanoid, type PayloadAction } from "@reduxjs/toolkit";
import {
  announcements,
  demoUsers,
  faqs,
  onboardingSteps,
  progressRecords,
  questions,
} from "../data/seed";
import type {
  Announcement,
  FAQ,
  InternTrack,
  ProgressRecord,
  QuestionCategory,
  ToolId,
  User,
} from "../types";

type HubState = {
  users: User[];
  onboardingSteps: typeof onboardingSteps;
  progressRecords: ProgressRecord[];
  questions: typeof questions;
  faqs: FAQ[];
  announcements: Announcement[];
};

const initialState: HubState = {
  users: demoUsers,
  onboardingSteps,
  progressRecords,
  questions,
  faqs,
  announcements,
};

const ensureProgressForIntern = (state: HubState, internId: string) => {
  state.onboardingSteps.forEach((step) => {
    const exists = state.progressRecords.some((record) => record.internId === internId && record.stepId === step.id);
    if (!exists) {
      state.progressRecords.push({ internId, stepId: step.id, status: "not-started" });
    }
  });
};

const hubSlice = createSlice({
  name: "hub",
  initialState,
  reducers: {
    markStepStatus: (
      state,
      action: PayloadAction<{ internId: string; stepId: ToolId; status: ProgressRecord["status"]; notes?: string }>,
    ) => {
      const record = state.progressRecords.find(
        (item) => item.internId === action.payload.internId && item.stepId === action.payload.stepId,
      );
      if (record) {
        record.status = action.payload.status;
        record.notes = action.payload.notes;
        record.updatedAt = new Date().toISOString();
      }
    },
    askQuestion: (
      state,
      action: PayloadAction<{ internId: string; category: QuestionCategory; description: string }>,
    ) => {
      const question = {
        id: nanoid(),
        internId: action.payload.internId,
        category: action.payload.category,
        description: action.payload.description,
        createdAt: new Date().toISOString(),
        status: "open" as const,
        replies: [],
      };
      state.questions.unshift(question);
    },
    answerQuestion: (
      state,
      action: PayloadAction<{ questionId: string; supervisorId: string; body: string; imageUrl?: string }>,
    ) => {
      const question = state.questions.find((item) => item.id === action.payload.questionId);
      if (!question) return;
      question.status = "answered";
      question.replies.push({
        id: nanoid(),
        supervisorId: action.payload.supervisorId,
        body: action.payload.body,
        imageUrl: action.payload.imageUrl,
        createdAt: new Date().toISOString(),
      });
    },
    closeQuestion: (state, action: PayloadAction<string>) => {
      const question = state.questions.find((item) => item.id === action.payload);
      if (question) question.status = "closed";
    },
    upsertIntern: (
      state,
      action: PayloadAction<{ id?: string; name: string; email: string; track: InternTrack; supervisorId: string }>,
    ) => {
      const existing = action.payload.id ? state.users.find((user) => user.id === action.payload.id) : undefined;
      if (existing) {
        existing.name = action.payload.name;
        existing.email = action.payload.email;
        existing.track = action.payload.track;
        existing.supervisorId = action.payload.supervisorId;
      } else {
        const internId = nanoid();
        state.users.push({
          id: internId,
          name: action.payload.name,
          email: action.payload.email,
          role: "intern",
          track: action.payload.track,
          supervisorId: action.payload.supervisorId,
          startDate: new Date().toISOString().slice(0, 10),
          avatarUrl:
            "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=160&q=80",
        });
        ensureProgressForIntern(state, internId);
      }
    },
    removeIntern: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      state.progressRecords = state.progressRecords.filter((record) => record.internId !== action.payload);
      state.questions = state.questions.filter((question) => question.internId !== action.payload);
    },
    createAnnouncement: (
      state,
      action: PayloadAction<{ title: string; body: string; audience: Announcement["audience"]; authorId: string }>,
    ) => {
      state.announcements.unshift({
        id: nanoid(),
        title: action.payload.title,
        body: action.payload.body,
        audience: action.payload.audience,
        authorId: action.payload.authorId,
        createdAt: new Date().toISOString(),
      });
    },
    removeAnnouncement: (state, action: PayloadAction<string>) => {
      state.announcements = state.announcements.filter((announcement) => announcement.id !== action.payload);
    },
    createFAQ: (state, action: PayloadAction<{ category: FAQ["category"]; question: string; answer: string }>) => {
      state.faqs.unshift({
        id: nanoid(),
        category: action.payload.category,
        question: action.payload.question,
        answer: action.payload.answer,
      });
    },
    removeFAQ: (state, action: PayloadAction<string>) => {
      state.faqs = state.faqs.filter((faq) => faq.id !== action.payload);
    },
  },
});

export const {
  markStepStatus,
  askQuestion,
  answerQuestion,
  closeQuestion,
  upsertIntern,
  removeIntern,
  createAnnouncement,
  removeAnnouncement,
  createFAQ,
  removeFAQ,
} = hubSlice.actions;

export default hubSlice.reducer;
