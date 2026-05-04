import type { OnboardingStep, ProgressRecord, User } from "../types";

export const getInternProgress = (internId: string, records: ProgressRecord[], steps: OnboardingStep[]) => {
  const internRecords = steps.map((step) => {
    return records.find((record) => record.internId === internId && record.stepId === step.id) ?? {
      internId,
      stepId: step.id,
      status: "not-started" as const,
    };
  });
  const done = internRecords.filter((record) => record.status === "done").length;
  const inProgress = internRecords.filter((record) => record.status === "in-progress").length;
  const percent = steps.length === 0 ? 0 : Math.round((done / steps.length) * 100);
  return { records: internRecords, done, inProgress, pending: steps.length - done, percent };
};

export const getAverageProgress = (interns: User[], records: ProgressRecord[], steps: OnboardingStep[]) => {
  if (interns.length === 0) return 0;
  const total = interns.reduce((sum, intern) => sum + getInternProgress(intern.id, records, steps).percent, 0);
  return Math.round(total / interns.length);
};

export const formatDateTime = (value?: string) => {
  if (!value) return "Not updated";
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};
