import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Badge } from "../components/Badge";
import { createAnnouncement, removeAnnouncement } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { Announcement } from "../types";
import { formatDateTime } from "../utils/progress";

export function AnnouncementsPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const user = useAppSelector((state) => state.hub.users.find((item) => item.id === currentUserId));
  const allAnnouncements = useAppSelector((state) => state.hub.announcements);
  const announcements = allAnnouncements.filter(
    (announcement) => user?.role === "supervisor" || announcement.audience === "all" || announcement.audience === "interns",
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [audience, setAudience] = useState<Announcement["audience"]>("all");
  const canManage = user?.role === "supervisor";

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!title.trim() || !body.trim()) return;
    dispatch(createAnnouncement({ title: title.trim(), body: body.trim(), audience, authorId: currentUserId }));
    setTitle("");
    setBody("");
    setAudience("all");
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">Announcements</span>
          <h1>Updates for the onboarding cohort</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        {canManage && (
          <form className="panel" onSubmit={submit}>
            <div className="panel-heading">
              <h2>Create announcement</h2>
            </div>
            <label className="field">
              <span>Title</span>
              <input value={title} onChange={(event) => setTitle(event.target.value)} />
            </label>
            <label className="field">
              <span>Audience</span>
              <select value={audience} onChange={(event) => setAudience(event.target.value as Announcement["audience"])}>
                <option value="all">all</option>
                <option value="interns">interns</option>
                <option value="supervisors">supervisors</option>
              </select>
            </label>
            <label className="field">
              <span>Message</span>
              <textarea rows={5} value={body} onChange={(event) => setBody(event.target.value)} />
            </label>
            <button className="primary-button" type="submit">
              <Plus size={18} />
              Publish
            </button>
          </form>
        )}

        <article className={`panel ${canManage ? "wide-panel" : "full-panel"}`}>
          <div className="panel-heading">
            <h2>Latest updates</h2>
            <Badge label={`${announcements.length} posts`} tone="blue" />
          </div>
          <div className="announcement-list">
            {announcements.map((announcement) => (
              <div className="announcement-card" key={announcement.id}>
                <div>
                  <Badge label={announcement.audience} tone="gray" />
                  <h2>{announcement.title}</h2>
                  <span>{formatDateTime(announcement.createdAt)}</span>
                  <p>{announcement.body}</p>
                </div>
                {canManage && (
                  <button className="danger-button icon-danger" onClick={() => dispatch(removeAnnouncement(announcement.id))} aria-label={`Remove ${announcement.title}`}>
                    <Trash2 size={16} />
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
