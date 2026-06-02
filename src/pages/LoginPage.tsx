import { LogIn } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.hub.users);
  const [selectedUser, setSelectedUser] = useState(
    users[1]?.id ?? users[0]?.id ?? "",
  );
  const selected = useMemo(
    () => users.find((user) => user.id === selectedUser),
    [selectedUser, users],
  );

  return (
    <main className="login-page">
      <section className="login-panel">
        <div className="brand login-brand">
          <div className="brand-mark">D</div>
          <div>
            <strong>Double InternHub</strong>
            <span>Intern onboarding and supervisor support</span>
          </div>
        </div>
        <div className="login-copy">
          <h1>Sign in to your onboarding workspace</h1>
          <p>
            A platform that includes dashboards, progress tracking, questions,
            and everything you need during internship onboarding.
          </p>
        </div>
        <label className="field">
          <span>Demo account</span>
          <select
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} -{" "}
                {user.role === "intern" ? user.track : "Supervisor"}
              </option>
            ))}
          </select>
        </label>
        {selected && (
          <div className="selected-user">
            <img src={selected.avatarUrl} alt="" />
            <div>
              <strong>{selected.name}</strong>
              <span>{selected.email}</span>
            </div>
          </div>
        )}
        <button
          className="primary-button"
          onClick={() => {
            dispatch(login(selectedUser));
            navigate("/dashboard");
          }}
        >
          <LogIn size={18} />
          Sign in
        </button>
      </section>
      <section className="login-visual" aria-hidden="true">
        <div className="login-visual-content">
          <span>May 2026 cohort</span>
          <strong>7 setup modules</strong>
          <p>
            Questions, announcements, progress reviews, and learning docs stay
            in one place.
          </p>
        </div>
      </section>
    </main>
  );
}
