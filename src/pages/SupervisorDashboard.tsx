import { AlertCircle, CheckCircle2, MessageSquare, Users } from "lucide-react";
import { Badge, progressTone } from "../components/Badge";
import { ProgressBar } from "../components/ProgressBar";
import { StatCard } from "../components/StatCard";
import { useAppSelector } from "../store/hooks";
import { getAverageProgress, getInternProgress } from "../utils/progress";

export function SupervisorDashboard() {
  const users = useAppSelector((state) => state.hub.users);
  const interns = users.filter((user) => user.role === "intern");
  const steps = useAppSelector((state) => state.hub.onboardingSteps);
  const records = useAppSelector((state) => state.hub.progressRecords);
  const questions = useAppSelector((state) => state.hub.questions);
  const average = getAverageProgress(interns, records, steps);
  const openQuestions = questions.filter((question) => question.status === "open");
  const completedInterns = interns.filter((intern) => getInternProgress(intern.id, records, steps).percent === 100).length;

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Supervisor dashboard</span>
          <h1>Intern progress overview</h1>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard label="Active interns" value={interns.length} detail="Across Frontend, Backend, and QA" icon={Users} />
        <StatCard label="Average progress" value={`${average}%`} detail="All onboarding modules" icon={CheckCircle2} />
        <StatCard label="Open questions" value={openQuestions.length} detail="Waiting for supervisor reply" icon={MessageSquare} />
        <StatCard label="Fully complete" value={completedInterns} detail="Interns at 100%" icon={AlertCircle} />
      </div>

      <article className="panel supervisor-progress-panel">
        <div className="panel-heading">
          <h2>Progress by intern</h2>
          <Badge label={`${steps.length} modules`} tone="blue" />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Intern</th>
                <th>Track</th>
                <th>Progress</th>
                <th>Current status</th>
                <th>Open questions</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern) => {
                const progress = getInternProgress(intern.id, records, steps);
                const current = progress.records.find((record) => record.status === "in-progress") ?? progress.records.find((record) => record.status === "not-started");
                const currentStep = steps.find((step) => step.id === current?.stepId);
                return (
                  <tr key={intern.id}>
                    <td>
                      <div className="person-cell">
                        <img src={intern.avatarUrl} alt="" />
                        <div>
                          <strong>{intern.name}</strong>
                          <span>{intern.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{intern.track}</td>
                    <td>
                      <ProgressBar value={progress.percent} label="Completion" />
                    </td>
                    <td>
                      {current && currentStep ? (
                        <Badge label={`${currentStep.title}: ${current.status.replace("-", " ")}`} tone={progressTone[current.status]} />
                      ) : (
                        <Badge label="Complete" tone="green" />
                      )}
                    </td>
                    <td>{questions.filter((question) => question.internId === intern.id && question.status === "open").length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </article>

    </section>
  );
}
