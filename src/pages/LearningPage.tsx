import { Check, ChevronLeft, Copy, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import { Link, Navigate, useParams } from "react-router-dom";
import { Badge, progressTone } from "../components/Badge";
import { markStepStatus } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getInternProgress } from "../utils/progress";

export function LearningPage() {
  const { toolId } = useParams();
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const steps = useAppSelector((state) => state.hub.onboardingSteps);
  const records = useAppSelector((state) => state.hub.progressRecords);
  const step = steps.find((item) => item.id === toolId);

  if (!step) return <Navigate to="/intern/onboarding" replace />;
  const progress = getInternProgress(currentUserId, records, steps);
  const record = progress.records.find((item) => item.stepId === step.id)!;
  const learningSections =
    step.instructionSections ??
    step.instructions.map((instruction, index) => ({
      id: `${step.id}-section-${index}`,
      title: instruction.replace(/\.$/, ""),
      body:
        index === 0
          ? "Start here and confirm the basic account access before moving to the next setup step."
          : "Complete this action, then keep any blockers ready for the Ask page.",
      imageUrl: index === 0 ? step.imageUrl : undefined,
      documents: index === 0 ? step.documents : [],
      codeSnippets: index === 0 ? step.codeSnippets : [],
    }));

  const copySnippet = async (code: string) => {
    await navigator.clipboard?.writeText(code);
    toast.success("Code snippet copied");
  };

  return (
    <section className="learn-page">
      <div className="learn-hero">
        <img src={step.imageUrl} alt="" />
        <div className="learn-hero-content">
          <Link className="back-link" to="/intern/onboarding">
            <ChevronLeft size={18} />
            Back to plan
          </Link>
          <span className="eyebrow">{step.category}</span>
          <h1>{step.title}</h1>
          <p>{step.summary}</p>
          <div className="inline-actions">
            <Badge label={record.status.replace("-", " ")} tone={progressTone[record.status]} />
            <span>{step.estimatedMinutes} min setup</span>
          </div>
        </div>
      </div>

      <div className="learn-layout">
        <aside className="learn-toc">
          {learningSections.map((section, index) => (
            <a key={section.id} href={`#${section.id}`}>
              {index + 1}. {section.title}
            </a>
          ))}
          <a href="#links">Links</a>
        </aside>
        <article className="learn-content">
          {learningSections.map((section, index) => (
            <section id={section.id} key={section.id} className="instruction-section">
              <div className="instruction-section-head">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h2>{section.title}</h2>
                  <p>{section.body}</p>
                </div>
              </div>
              {section.imageUrl && <img className="instruction-image" src={section.imageUrl} alt="" />}
              {section.documents && section.documents.length > 0 && (
                <div className="doc-grid">
                  {section.documents.map((doc) => (
                    <div className="doc-card" key={doc.id}>
                      <Badge label={doc.type} tone="blue" />
                      <strong>{doc.title}</strong>
                      <p>{doc.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {section.codeSnippets?.map((snippet) => (
                <div className="snippet" key={snippet.title}>
                  <div className="snippet-header">
                    <strong>{snippet.title}</strong>
                    <button className="icon-button" aria-label="Copy snippet" onClick={() => void copySnippet(snippet.code)}>
                      <Copy size={16} />
                    </button>
                  </div>
                  <pre>
                    <code>{snippet.code}</code>
                  </pre>
                </div>
              ))}
            </section>
          ))}

          <section id="links">
            <h2>Useful links</h2>
            <div className="resource-list">
              {step.links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          </section>

          <div className="completion-panel">
            <div>
              <strong>Finished this setup?</strong>
              <span>Mark the module as done so your supervisor can track progress.</span>
            </div>
            <button
              className="primary-button"
              onClick={() => dispatch(markStepStatus({ internId: currentUserId, stepId: step.id, status: "done" }))}
            >
              <Check size={18} />
              Mark as done
            </button>
          </div>
        </article>
      </div>
    </section>
  );
}
