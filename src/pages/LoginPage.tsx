import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { type FormEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const users = useAppSelector((state) => state.hub.users);
  const firstIntern = users.find((user) => user.role === "intern") ?? users[0];
  const [email, setEmail] = useState(firstIntern?.email ?? "");
  const [password, setPassword] = useState(firstIntern?.password ?? "");
  const [error, setError] = useState("");
  const matchedUser = useMemo(
    () =>
      users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      ),
    [email, users],
  );
  const canSubmit = email.trim().length > 0 && password.length > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );

    if (!user) {
      setError("Email or password does not match a prototype account.");
      return;
    }

    setError("");
    dispatch(login(user.id));
    navigate("/dashboard");
  }

  function fillAccount(userId: string) {
    const user = users.find((item) => item.id === userId);
    if (!user) return;
    setEmail(user.email);
    setPassword(user.password);
    setError("");
  }

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
            Double InternHub gives interns and supervisors one place to review
            progress, ask questions, and complete every setup step with
            confidence.
          </p>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <label className="field">
            <span>
              <Mail size={16} />
              Email
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError("");
              }}
              placeholder="name@double.my"
              autoComplete="email"
              aria-invalid={Boolean(error)}
            />
          </label>
          <label className="field">
            <span>
              <LockKeyhole size={16} />
              Password
            </span>
            <input
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError("");
              }}
              placeholder="Enter password"
              autoComplete="current-password"
              aria-invalid={Boolean(error)}
            />
          </label>

          {error && (
            <div className="login-alert" role="alert">
              {error}
            </div>
          )}

          {matchedUser && (
            <div className="selected-user">
              <img src={matchedUser.avatarUrl} alt="" />
              <div>
                <strong>{matchedUser.name}</strong>
                <span>
                  {matchedUser.role === "intern"
                    ? `${matchedUser.track} intern`
                    : "Supervisor"}
                </span>
              </div>
              <CheckCircle2 size={20} />
            </div>
          )}

          <button className="primary-button login-submit" disabled={!canSubmit}>
            Sign in
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="demo-accounts" aria-label="Prototype demo accounts">
          <div className="demo-accounts-head">
            <div>
              <strong>Prototype accounts</strong>
              <span>Use these credentials for the Assignment 2 demo.</span>
            </div>
            <ShieldCheck size={22} />
          </div>
          <div className="demo-account-grid">
            {users.map((user) => (
              <button
                type="button"
                className={
                  matchedUser?.id === user.id
                    ? "demo-account demo-account-active"
                    : "demo-account"
                }
                key={user.id}
                onClick={() => fillAccount(user.id)}
              >
                <img src={user.avatarUrl} alt="" />
                <div>
                  <strong>
                    {user.role === "intern" ? user.track : "Supervisor"}
                  </strong>
                  <span>{user.email}</span>
                  <code>{user.password}</code>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="login-visual" aria-hidden="true">
        <div className="login-visual-content">
          <span>High-fidelity alpha prototype</span>
          <strong>4 role-based workspaces</strong>
          <p>
            Frontend, backend, QA, and supervisor users can move through
            realistic dashboards, learning plans, support questions, and
            progress reviews.
          </p>
          <div className="login-visual-points">
            <span>
              <UserRound size={16} />
              Intern progress tracking
            </span>
            <span>
              <ShieldCheck size={16} />
              Supervisor review flow
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
