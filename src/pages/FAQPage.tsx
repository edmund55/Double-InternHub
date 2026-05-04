import { ChevronDown, Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Badge } from "../components/Badge";
import { createFAQ, removeFAQ } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { FAQ, QuestionCategory } from "../types";

const faqCategories: FAQ["category"][] = [
  "General",
  "Company policy",
  "Hostinger Mail",
  "Productive",
  "Slack",
  "GitLab",
  "GitHub Desktop",
  "VS Code",
  "Kakitangan",
];

export function FAQPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const user = useAppSelector((state) => state.hub.users.find((item) => item.id === currentUserId));
  const faqs = useAppSelector((state) => state.hub.faqs);
  const [category, setCategory] = useState<FAQ["category"]>("General");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const canManage = user?.role === "supervisor";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!question.trim() || !answer.trim()) return;
    dispatch(createFAQ({ category: category as QuestionCategory | "General", question: question.trim(), answer: answer.trim() }));
    setQuestion("");
    setAnswer("");
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">FAQ</span>
          <h1>Common onboarding answers</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        {canManage && (
          <form className="panel" onSubmit={submit}>
            <div className="panel-heading">
              <h2>Add FAQ</h2>
            </div>
            <label className="field">
              <span>Category</span>
              <select value={category} onChange={(event) => setCategory(event.target.value as FAQ["category"])}>
                {faqCategories.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Question</span>
              <input value={question} onChange={(event) => setQuestion(event.target.value)} />
            </label>
            <label className="field">
              <span>Answer</span>
              <textarea rows={5} value={answer} onChange={(event) => setAnswer(event.target.value)} />
            </label>
            <button className="primary-button" type="submit">
              <Plus size={18} />
              Add FAQ
            </button>
          </form>
        )}

        <article className={`panel ${canManage ? "wide-panel" : "full-panel"}`}>
          <div className="panel-heading">
            <h2>Knowledge base</h2>
            <Badge label={`${faqs.length} articles`} tone="blue" />
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.id} className="faq-item">
                <summary>
                  <span>
                    <Badge label={faq.category} tone="gray" />
                    <strong>{faq.question}</strong>
                  </span>
                  <ChevronDown className="faq-chevron" size={18} />
                  {canManage && (
                    <button
                      className="danger-button"
                      onClick={(event) => {
                        event.preventDefault();
                        dispatch(removeFAQ(faq.id));
                      }}
                      aria-label={`Remove FAQ ${faq.question}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
