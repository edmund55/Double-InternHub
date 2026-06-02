import {
  ClipboardCheck,
  HelpCircle,
  Home,
  LogOut,
  Megaphone,
  MessageSquareReply,
  PanelLeft,
  Settings2,
  Users,
} from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { logout } from "../store/authSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";

const internNav = [
  { to: "/intern/dashboard", label: "Dashboard", icon: Home },
  { to: "/intern/onboarding", label: "Onboarding", icon: ClipboardCheck },
  { to: "/intern/ask", label: "Ask", icon: MessageSquareReply },
  { to: "/intern/faq", label: "FAQ", icon: HelpCircle },
  { to: "/intern/announcements", label: "Announcements", icon: Megaphone },
];

const supervisorNav = [
  { to: "/supervisor/dashboard", label: "Dashboard", icon: Home },
  { to: "/supervisor/answer", label: "Answer", icon: MessageSquareReply },
  { to: "/supervisor/manage", label: "Management", icon: Settings2 },
  { to: "/supervisor/faq", label: "FAQ", icon: HelpCircle },
  { to: "/supervisor/announcements", label: "Announcements", icon: Megaphone },
];

export function AppLayout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const user = useAppSelector((state) =>
    state.hub.users.find((item) => item.id === currentUserId),
  );

  if (!user) return null;
  const nav = user.role === "intern" ? internNav : supervisorNav;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">D</div>
          <div>
            <strong>Double InternHub</strong>
            <span>Onboarding workspace</span>
          </div>
        </div>
        <nav className="side-nav">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to}>
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <button
          className="ghost-button sidebar-logout"
          onClick={() => {
            dispatch(logout());
            navigate("/login");
          }}
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="mobile-brand">
            <PanelLeft size={20} />
            <strong>Double InternHub</strong>
          </div>
          <div className="topbar-actions">
            <div className="user-chip">
              <img src={user.avatarUrl} alt="" />
              <div>
                <strong>{user.name}</strong>
                <span>
                  {user.role === "intern" ? user.track : "Supervisor"}
                </span>
              </div>
            </div>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  );
}
