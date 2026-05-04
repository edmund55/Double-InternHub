import type { ProgressStatus, QuestionStatus } from "../types";

type BadgeProps = {
  label: string;
  tone?: "blue" | "green" | "yellow" | "red" | "gray";
};

export function Badge({ label, tone = "gray" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{label}</span>;
}

export const progressTone: Record<ProgressStatus, BadgeProps["tone"]> = {
  "not-started": "gray",
  "in-progress": "yellow",
  done: "green",
};

export const questionTone: Record<QuestionStatus, BadgeProps["tone"]> = {
  open: "red",
  answered: "green",
  closed: "gray",
};
