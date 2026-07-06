import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, progressTone } from "../components/Badge";
import { ProgressBar } from "../components/ProgressBar";
import { StatCard } from "../components/StatCard";
import { useAppSelector } from "../store/hooks";
import { formatDateTime, getInternProgress } from "../utils/progress";

export function InternDashboard() {
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const currentUser = useAppSelector((state) =>
    state.hub.users.find((user) => user.id === currentUserId),
  );
  const steps = useAppSelector((state) => state.hub.onboardingSteps);
  const progressRecords = useAppSelector((state) => state.hub.progressRecords);
  const questions = useAppSelector((state) =>
    state.hub.questions.filter(
      (question) => question.internId === currentUserId,
    ),
  );
  const announcements = useAppSelector((state) =>
    state.hub.announcements.filter(
      (announcement) =>
        announcement.audience === "all" || announcement.audience === "interns",
    ),
  );
  const progress = getInternProgress(currentUserId, progressRecords, steps);
  const pending = steps.filter((step) =>
    progress.records.some(
      (record) => record.stepId === step.id && record.status !== "done",
    ),
  );
  const answered = questions
    .filter((question) => question.status === "answered")
    .slice(0, 3);
  const nextStep = pending[0];
  const openQuestions = questions.filter((question) => question.status === "open");

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Intern dashboard</span>
          <h1>Your onboarding command center</h1>
        </div>
        <Link className="primary-button" to="/intern/onboarding">
          Continue setup
          <ArrowRight size={18} />
        </Link>
      </div>

      <article className="welcome-panel">
        <div>
          <span className="eyebrow">Today&apos;s priority</span>
          <h2>
            {nextStep
              ? `Continue ${nextStep.title}`
              : `Great work${currentUser ? `, ${currentUser.name.split(" ")[0]}` : ""}`}
          </h2>
          <p>
            {nextStep
              ? `${nextStep.summary} This module usually takes ${nextStep.estimatedMinutes} minutes.`
              : "Your onboarding modules are complete. Keep an eye on announcements and supervisor replies."}
          </p>
        </div>
        <div className="welcome-actions">
          {nextStep && (
            <Link
              className="primary-button"
              to={`/intern/onboarding/${nextStep.id}`}
            >
              Open next step
              <ArrowRight size={18} />
            </Link>
          )}
          <span>{openQuestions.length} open questions</span>
        </div>
      </article>

      <div className="stats-grid">
        <StatCard
          label="Overall progress"
          value={`${progress.percent}%`}
          detail={`${progress.done} of ${steps.length} modules done`}
          icon={CheckCircle2}
        />
        <StatCard
          label="Pending setup"
          value={progress.pending}
          detail={`${progress.inProgress} currently in progress`}
          icon={Clock3}
        />
        <StatCard
          label="Supervisor replies"
          value={answered.length}
          detail={`${questions.length} total questions asked`}
          icon={MessageSquare}
        />
        <StatCard
          label="Tool modules"
          value={steps.length}
          detail="Docs, links, snippets, tracking"
          icon={Wrench}
        />
      </div>

      <div className="intern-dashboard-grid">
        <div className="dashboard-left-side">
          <article className="panel">
            <div className="panel-heading">
              <h2>Setup progress</h2>
              <Badge
                label={progress.percent === 100 ? "Complete" : "Active"}
                tone={progress.percent === 100 ? "green" : "blue"}
              />
            </div>
            <ProgressBar value={progress.percent} label="Onboarding plan" />
            <div className="setup-list">
              {steps.map((step) => {
                const record = progress.records.find(
                  (item) => item.stepId === step.id,
                )!;
                return (
                  <Link
                    className="setup-row"
                    key={step.id}
                    to={`/intern/onboarding/${step.id}`}
                  >
                    <div>
                      <strong>{step.title}</strong>
                      <span>{step.summary}</span>
                    </div>
                    <Badge
                      label={record.status.replace("-", " ")}
                      tone={progressTone[record.status]}
                    />
                  </Link>
                );
              })}
            </div>
          </article>
          <article className="panel">
            <div className="panel-heading">
              <h2>Quick access</h2>
            </div>
            <div className="resource-list">
              {steps.slice(0, 7).map((step) => (
                <a
                  key={step.id}
                  href={step.links[0]?.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {step.title}
                  <ArrowRight size={16} />
                </a>
              ))}
            </div>
          </article>
        </div>

        <div className="dashboard-side-stack">
          <aside className="panel">
            <div className="panel-heading">
              <h2>Pending setup</h2>
            </div>
            <div className="stack-list">
              {pending.length === 0 && (
                <div className="empty-state">
                  <CheckCircle2 size={22} />
                  <strong>All modules are complete</strong>
                  <span>You can still revisit guides from the onboarding page.</span>
                </div>
              )}
              {pending.slice(0, 5).map((step) => (
                <Link
                  key={step.id}
                  to={`/intern/onboarding/${step.id}`}
                  className="mini-link"
                >
                  <strong>{step.title}</strong>
                  <span>{step.estimatedMinutes} min</span>
                </Link>
              ))}
            </div>
          </aside>

          <article className="panel">
            <div className="panel-heading">
              <h2>Announcements</h2>
            </div>
            <div className="stack-list">
              {announcements.length === 0 && (
                <div className="empty-state">
                  <MessageSquare size={22} />
                  <strong>No announcements yet</strong>
                  <span>Team updates will appear here when posted.</span>
                </div>
              )}
              {announcements.slice(0, 3).map((announcement) => (
                <div key={announcement.id} className="announcement-mini">
                  <strong>{announcement.title}</strong>
                  <span>{announcement.body}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-heading">
              <h2>Supervisor responses</h2>
            </div>
            <div className="stack-list">
              {answered.length === 0 && (
                <div className="empty-state">
                  <MessageSquare size={22} />
                  <strong>No replies yet</strong>
                  <span>Supervisor responses will appear here after a question is answered.</span>
                </div>
              )}
              {answered.map((question) => (
                <Link
                  to="/intern/ask"
                  key={question.id}
                  className="question-preview"
                >
                  <Badge label={question.category} tone="blue" />
                  <strong>{question.description}</strong>
                  <span>
                    {formatDateTime(
                      question.replies[question.replies.length - 1]?.createdAt,
                    )}
                  </span>
                </Link>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
