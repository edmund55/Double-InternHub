import { Check, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge, progressTone } from "../components/Badge";
import { ProgressBar } from "../components/ProgressBar";
import { markStepStatus } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getInternProgress } from "../utils/progress";

export function OnboardingPlanPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const steps = useAppSelector((state) => state.hub.onboardingSteps);
  const records = useAppSelector((state) => state.hub.progressRecords);
  const progress = getInternProgress(currentUserId, records, steps);
  const nextRecord =
    progress.records.find((record) => record.status === "in-progress") ??
    progress.records.find((record) => record.status === "not-started");
  const nextStep = steps.find((step) => step.id === nextRecord?.stepId);

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Onboarding modules</span>
          <h1>Complete your setup modules</h1>
        </div>
        <ProgressBar value={progress.percent} label="Total completion" />
      </div>

      <article className="welcome-panel compact-welcome">
        <div>
          <span className="eyebrow">Guided setup</span>
          <h2>
            {nextStep
              ? `Recommended next: ${nextStep.title}`
              : "All setup modules completed"}
          </h2>
          <p>
            {nextStep
              ? "Open the learning guide first, then mark the module done after you complete the required setup."
              : "You can still open any module to review documents, links, and setup notes."}
          </p>
        </div>
        <div className="welcome-actions">
          <Badge label={`${progress.done} done`} tone="green" />
          <Badge
            label={`${progress.pending} pending`}
            tone={progress.pending ? "yellow" : "green"}
          />
        </div>
      </article>

      <div className="tool-grid">
        {steps.map((step, index) => {
          const record = progress.records.find(
            (item) => item.stepId === step.id,
          )!;
          return (
            <article
              className={
                record.status === "done"
                  ? "tool-card tool-card-done"
                  : "tool-card"
              }
              key={step.id}
            >
              <img src={step.imageUrl} alt="" />
              {record.status === "done" && (
                <div className="tool-card-complete">
                  <CheckCircle2 size={16} />
                  Completed
                </div>
              )}
              <div className="tool-card-body">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">
                      Module {index + 1} / {step.category}
                    </span>
                    <h2>{step.title}</h2>
                  </div>
                  <Badge
                    label={record.status.replace("-", " ")}
                    tone={progressTone[record.status]}
                  />
                </div>
                <p>{step.summary}</p>
                <div className="tool-card-meta">
                  <span>{step.estimatedMinutes} min</span>
                  <span>{step.documents.length} docs</span>
                  <span>{step.links.length} links</span>
                </div>
                <div className="inline-actions">
                  <Link
                    className="secondary-button"
                    to={`/intern/onboarding/${step.id}`}
                  >
                    Learn
                    <ExternalLink size={16} />
                  </Link>
                  <button
                    className="primary-button"
                    disabled={record.status === "done"}
                    onClick={() =>
                      dispatch(
                        markStepStatus({
                          internId: currentUserId,
                          stepId: step.id,
                          status: "done",
                        }),
                      )
                    }
                  >
                    <Check size={16} />
                    {record.status === "done" ? "Completed" : "Mark done"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
