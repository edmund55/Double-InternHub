import { ImagePlus, Send, X } from "lucide-react";
import { DragEvent, FormEvent, useMemo, useRef, useState } from "react";
import { Badge, questionTone } from "../components/Badge";
import { answerQuestion } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { QuestionCategory, QuestionStatus } from "../types";
import { formatDateTime } from "../utils/progress";

const allStatuses: Array<QuestionStatus | "all"> = ["all", "open", "answered", "closed"];

export function AnswerPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const users = useAppSelector((state) => state.hub.users);
  const questions = useAppSelector((state) => state.hub.questions);
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | "all">("open");
  const [categoryFilter, setCategoryFilter] = useState<QuestionCategory | "all">("all");
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Record<string, string>>({});
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  const categories = useMemo(
    () => Array.from(new Set(questions.map((question) => question.category))).sort(),
    [questions],
  );
  const filtered = questions.filter((question) => {
    const statusMatch = statusFilter === "all" || question.status === statusFilter;
    const categoryMatch = categoryFilter === "all" || question.category === categoryFilter;
    return statusMatch && categoryMatch;
  });

  const submitAnswer = (event: FormEvent, questionId: string) => {
    event.preventDefault();
    const body = answers[questionId]?.trim();
    if (!body) return;
    dispatch(answerQuestion({ questionId, supervisorId: currentUserId, body, imageUrl: images[questionId]?.trim() || undefined }));
    setAnswers((current) => ({ ...current, [questionId]: "" }));
    setImages((current) => ({ ...current, [questionId]: "" }));
  };

  const attachImage = (questionId: string, files: FileList | null) => {
    const file = files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImages((current) => ({ ...current, [questionId]: reader.result as string }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, questionId: string) => {
    event.preventDefault();
    attachImage(questionId, event.dataTransfer.files);
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Answer</span>
          <h1>Respond to intern questions</h1>
        </div>
        <div className="filter-row answer-filters">
          <label>
            <span>Status</span>
            <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as QuestionStatus | "all")}>
              {allStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span>Category</span>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value as QuestionCategory | "all")}>
              <option value="all">all categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="question-list">
        {filtered.map((question) => {
          const intern = users.find((user) => user.id === question.internId);
          return (
            <article className="panel question-card" key={question.id}>
              <div className="question-card-head">
                <div>
                  <div className="inline-actions">
                    <Badge label={question.category} tone="blue" />
                    <Badge label={question.status} tone={questionTone[question.status]} />
                  </div>
                  <h2>{question.description}</h2>
                  <span>
                    Asked by {intern?.name ?? "Intern"} on {formatDateTime(question.createdAt)}
                  </span>
                </div>
              </div>

              {question.replies.length > 0 && (
                <div className="reply-list">
                  {question.replies.map((reply) => (
                    <div className="reply-card" key={reply.id}>
                      <div className="reply-meta">
                        <strong>{users.find((user) => user.id === reply.supervisorId)?.name ?? "Supervisor"}</strong>
                        <span>{formatDateTime(reply.createdAt)}</span>
                      </div>
                      <p>{reply.body}</p>
                      {reply.imageUrl && <img src={reply.imageUrl} alt="Supervisor attachment" />}
                    </div>
                  ))}
                </div>
              )}

              <form className="answer-form" onSubmit={(event) => submitAnswer(event, question.id)}>
                <label className="field">
                  <span>Response</span>
                  <textarea
                    rows={4}
                    value={answers[question.id] ?? ""}
                    onChange={(event) => setAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
                    placeholder="Write a clear answer, next step, or policy reference."
                  />
                </label>
                <div
                  className={`drop-zone ${images[question.id] ? "drop-zone-filled" : ""}`}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => handleDrop(event, question.id)}
                  onClick={() => fileInputs.current[question.id]?.click()}
                  role="button"
                  tabIndex={0}
                >
                  <input
                    ref={(node) => {
                      fileInputs.current[question.id] = node;
                    }}
                    type="file"
                    accept="image/*"
                    onChange={(event) => attachImage(question.id, event.target.files)}
                    hidden
                  />
                  {images[question.id] ? (
                    <div className="drop-preview">
                      <img src={images[question.id]} alt="Selected attachment preview" />
                      <button
                        className="danger-button"
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setImages((current) => ({ ...current, [question.id]: "" }));
                        }}
                        aria-label="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <ImagePlus size={22} />
                      <strong>Drop image here</strong>
                      <span>or click to upload a screenshot</span>
                    </>
                  )}
                </div>
                <button className="primary-button" type="submit">
                  <Send size={18} />
                  Send answer
                </button>
              </form>
            </article>
          );
        })}
      </div>
    </section>
  );
}
