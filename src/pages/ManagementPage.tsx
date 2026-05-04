import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Badge } from "../components/Badge";
import { removeIntern, upsertIntern } from "../store/hubSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import type { InternTrack } from "../types";
import { getInternProgress } from "../utils/progress";

const tracks: InternTrack[] = ["Frontend Dev", "Backend Dev", "QA"];

export function ManagementPage() {
  const dispatch = useAppDispatch();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId)!;
  const users = useAppSelector((state) => state.hub.users);
  const steps = useAppSelector((state) => state.hub.onboardingSteps);
  const records = useAppSelector((state) => state.hub.progressRecords);
  const interns = users.filter((user) => user.role === "intern");
  const [editingId, setEditingId] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [track, setTrack] = useState<InternTrack>("Frontend Dev");

  const resetForm = () => {
    setEditingId(undefined);
    setName("");
    setEmail("");
    setTrack("Frontend Dev");
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    dispatch(upsertIntern({ id: editingId, name: name.trim(), email: email.trim(), track, supervisorId: currentUserId }));
    resetForm();
  };

  return (
    <section className="page">
      <div className="page-heading">
        <div>
          <span className="eyebrow">CRUD management</span>
          <h1>Manage interns and assignments</h1>
        </div>
      </div>

      <div className="dashboard-grid">
        <form className="panel" onSubmit={submit}>
          <div className="panel-heading">
            <h2>{editingId ? "Edit intern" : "Create intern"}</h2>
          </div>
          <label className="field">
            <span>Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Intern name" />
          </label>
          <label className="field">
            <span>Email</span>
            <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@double.my" />
          </label>
          <label className="field">
            <span>Role track</span>
            <select value={track} onChange={(event) => setTrack(event.target.value as InternTrack)}>
              {tracks.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="inline-actions">
            <button className="primary-button" type="submit">
              <Plus size={18} />
              {editingId ? "Save changes" : "Add intern"}
            </button>
            {editingId && (
              <button className="secondary-button" type="button" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>

        <article className="panel wide-panel">
          <div className="panel-heading">
            <h2>Intern records</h2>
            <Badge label={`${interns.length} interns`} tone="blue" />
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Track</th>
                  <th>Progress</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {interns.map((intern) => {
                  const progress = getInternProgress(intern.id, records, steps);
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
                      <td>{progress.percent}%</td>
                      <td>
                        <div className="inline-actions">
                          <button
                            className="secondary-button"
                            onClick={() => {
                              setEditingId(intern.id);
                              setName(intern.name);
                              setEmail(intern.email);
                              setTrack(intern.track ?? "Frontend Dev");
                            }}
                          >
                            Edit
                          </button>
                          <button className="danger-button" onClick={() => dispatch(removeIntern(intern.id))} aria-label={`Remove ${intern.name}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}
