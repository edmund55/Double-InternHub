import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AnnouncementsPage } from "./pages/AnnouncementsPage";
import { AnswerPage } from "./pages/AnswerPage";
import { AskPage } from "./pages/AskPage";
import { FAQPage } from "./pages/FAQPage";
import { InternDashboard } from "./pages/InternDashboard";
import { LearningPage } from "./pages/LearningPage";
import { LoginPage } from "./pages/LoginPage";
import { ManagementPage } from "./pages/ManagementPage";
import { OnboardingPlanPage } from "./pages/OnboardingPlanPage";
import { SupervisorDashboard } from "./pages/SupervisorDashboard";
import { useAppSelector } from "./store/hooks";

function DashboardRedirect() {
  const currentUserId = useAppSelector((state) => state.auth.currentUserId);
  const user = useAppSelector((state) => state.hub.users.find((item) => item.id === currentUserId));
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={user.role === "intern" ? "/intern/dashboard" : "/supervisor/dashboard"} replace />;
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 2200 }} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<DashboardRedirect />} />
            <Route path="/dashboard" element={<DashboardRedirect />} />
            <Route element={<ProtectedRoute role="intern" />}>
              <Route path="/intern/dashboard" element={<InternDashboard />} />
              <Route path="/intern/onboarding" element={<OnboardingPlanPage />} />
              <Route path="/intern/onboarding/:toolId" element={<LearningPage />} />
              <Route path="/intern/ask" element={<AskPage />} />
              <Route path="/intern/faq" element={<FAQPage />} />
              <Route path="/intern/announcements" element={<AnnouncementsPage />} />
            </Route>
            <Route element={<ProtectedRoute role="supervisor" />}>
              <Route path="/supervisor/dashboard" element={<SupervisorDashboard />} />
              <Route path="/supervisor/answer" element={<AnswerPage />} />
              <Route path="/supervisor/manage" element={<ManagementPage />} />
              <Route path="/supervisor/faq" element={<FAQPage />} />
              <Route path="/supervisor/announcements" element={<AnnouncementsPage />} />
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </>
  );
}
