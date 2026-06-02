import { Check, ExternalLink } from "lucide-react";
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

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Onboarding modules</span>
          <h1>Complete your setup modules</h1>
        </div>
        <ProgressBar value={progress.percent} label="Total completion" />
      </div>

      <div className="tool-grid">
        {steps.map((step) => {
          const record = progress.records.find(
            (item) => item.stepId === step.id,
          )!;
          return (
            <article className="tool-card" key={step.id}>
              <img src={step.imageUrl} alt="" />
              <div className="tool-card-body">
                <div className="panel-heading">
                  <div>
                    <span className="eyebrow">{step.category}</span>
                    <h2>{step.title}</h2>
                  </div>
                  <Badge
                    label={record.status.replace("-", " ")}
                    tone={progressTone[record.status]}
                  />
                </div>
                <p>{step.summary}</p>
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
                    Mark done
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
