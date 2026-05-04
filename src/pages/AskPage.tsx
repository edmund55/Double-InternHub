import { Send } from "lucide-react";
import { FormEvent, useState } from "react";
import { Badge, questionTone } from "../components/Badge";
import { askQuestion, closeQuestion } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { QuestionCategory } from "../types";
import { formatDateTime } from "../utils/progress";

const categories: QuestionCategory[] = [
  "Company policy",
  "Hostinger Mail",
  "Productive",
  "Slack",
  "GitLab",
  "GitHub Desktop",
  "VS Code",
  "Kakitangan",
];

export function AskPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const users = useAppSelector((state) => state.hub.users);
  const questions = useAppSelector((state) =>
    state.hub.questions.filter((question) => question.internId === currentUserId),
  );
  const [category, setCategory] = useState<QuestionCategory>("Company policy");
  const [description, setDescription] = useState("");

  const submitQuestion = (event: FormEvent) => {
    event.preventDefault();
    if (!description.trim()) return;
    dispatch(askQuestion({ internId: currentUserId, category, description: description.trim() }));
    setDescription("");
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Ask</span>
          <h1>Questions and supervisor replies</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <form className="panel ask-form" onSubmit={submitQuestion}>
          <div className="panel-heading">
            <h2>Ask a question</h2>
          </div>
          <label className="field">
            <span>Question category</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as QuestionCategory)}>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>Description</span>
            <textarea
              rows={7}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Describe what you tried, what happened, and what you need help with."
            />
          </label>
          <button className="primary-button" type="submit">
            <Send size={18} />
            Submit question
          </button>
        </form>

        <article className="panel wide-panel">
          <div className="panel-heading">
            <h2>Question history</h2>
            <Badge label={`${questions.length} total`} tone="blue" />
          </div>
          <div className="question-list">
            {questions.map((question) => (
              <div className={`question-card question-card-${question.status}`} key={question.id}>
                <div className="question-card-head">
                  <div>
                    <Badge label={question.category} tone="blue" />
                    <h3>{question.description}</h3>
                    <span>{formatDateTime(question.createdAt)}</span>
                  </div>
                  <Badge label={question.status} tone={questionTone[question.status]} />
                </div>
                {question.replies.length > 0 && (
                  <div className="reply-list">
                    {question.replies.map((reply) => {
                      const supervisor = users.find((user) => user.id === reply.supervisorId);
                      return (
                        <div className="reply-card" key={reply.id}>
                          <div className="reply-meta">
                            <strong>{supervisor?.name ?? "Supervisor"}</strong>
                            <span>{formatDateTime(reply.createdAt)}</span>
                          </div>
                          <p>{reply.body}</p>
                          {reply.imageUrl && <img src={reply.imageUrl} alt="Supervisor attachment" />}
                        </div>
                      );
                    })}
                  </div>
                )}
                {question.status !== "closed" && (
                  <button className="ghost-button" onClick={() => dispatch(closeQuestion(question.id))}>
                    Mark resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
