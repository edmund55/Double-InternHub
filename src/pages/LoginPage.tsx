import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  LoaderCircle,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");
  const matchedUser = useMemo(
    () =>
      users.find(
        (user) => user.email.toLowerCase() === email.trim().toLowerCase(),
      ),
    [email, users],
  );
  const canSubmit =
    email.trim().length > 0 && password.length > 0 && !isSigningIn;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSigningIn) return;
    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.trim().toLowerCase() &&
        item.password === password,
    );

    if (!user) {
      setError(
        "Email or password is incorrect. Please check your details and try again.",
      );
      return;
    }

    setError("");
    setIsSigningIn(true);
    window.setTimeout(() => {
      dispatch(login(user.id));
      navigate("/dashboard");
    }, 450);
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
                setIsSigningIn(false);
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
            <div className="password-field">
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                  setIsSigningIn(false);
                }}
                placeholder="Enter password"
                autoComplete="current-password"
                aria-invalid={Boolean(error)}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setIsPasswordVisible((visible) => !visible)}
                aria-label={
                  isPasswordVisible ? "Hide password" : "Show password"
                }
                title={isPasswordVisible ? "Hide password" : "Show password"}
              >
                {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
            {isSigningIn ? (
              <>
                <LoaderCircle className="spin-icon" size={18} />
                Signing in...
              </>
            ) : (
              <>
                Sign in
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>
      </section>
      <section className="login-visual" aria-hidden="true">
        <div className="login-visual-content">
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
