import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layouts/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AllCasesPage from './pages/AllCasesPage';
import CaseSelectorPage from './pages/CaseSelectorPage';
import StatusOfPleadingsPage from './pages/StatusOfPleadingsPage';
import ClaimantRespondentPage from './pages/ClaimantRespondentPage';
import CounselsPage from './pages/CounselsPage';
import CaseOrderPage from './pages/CaseOrderPage';
import TerminationPage from './pages/TerminationPage';
import CauseListPage from './pages/CauseListPage';
import NotingPage from './pages/NotingPage';
import DraftLettersPage from './pages/DraftLettersPage';
import FeeDeficiencyCasesPage from './pages/FeeDeficiencyCasesPage';
import FeePendingCasesPage from './pages/FeePendingCasesPage';
import ShortPinkListPage from './pages/ShortPinkListPage';
import HearingsTodayPage from './pages/HearingsTodayPage';
import WorkStatusPage from './pages/WorkStatusPage';
import ArbitratorSetupPage from './pages/ArbitratorSetupPage';
import CounselSetupPage from './pages/CounselSetupPage';
import EfilingUsersPage from './pages/EfilingUsersPage';
import ReportsPage from './pages/ReportsPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="all-cases" element={<AllCasesPage />} />
        <Route path="allotted-case" element={<CaseSelectorPage title="Allotted Case" description="View and manage allotted cases" />} />
        <Route path="status-of-pleadings/:caseId" element={<StatusOfPleadingsPage />} />
        <Route path="status-of-pleadings" element={<CaseSelectorPage title="Status of Pleadings" description="Select a case to view pleading status" routePrefix="status-of-pleadings" />} />
        <Route path="tag-cases" element={<CaseSelectorPage title="Tag Cases" description="Tag and categorize cases" />} />
        <Route path="draft-letters/:caseId" element={<DraftLettersPage />} />
        <Route path="draft-letters" element={<DraftLettersPage />} />
        <Route path="claimant-respondent/:caseId" element={<ClaimantRespondentPage />} />
        <Route path="claimant-respondent" element={<CaseSelectorPage title="Claimant & Respondent" description="Select a case to view parties" routePrefix="claimant-respondent" />} />
        <Route path="counsels-case/:caseId" element={<CounselsPage />} />
        <Route path="counsels-case" element={<CaseSelectorPage title="Counsels" description="Select a case to view counsels" routePrefix="counsels-case" />} />
        <Route path="arbitral-tribunals/:caseId" element={<CaseSelectorPage title="Arbitral Tribunal" description="Manage arbitral tribunal" />} />
        <Route path="arbitral-tribunals" element={<CaseSelectorPage title="Arbitral Tribunal" description="Select a case to view tribunal" />} />
        <Route path="case-fee" element={<CaseSelectorPage title="Case Fee" description="View and manage case fees" />} />
        <Route path="fee-deficiency" element={<FeeDeficiencyCasesPage />} />
        <Route path="fee-pending" element={<FeePendingCasesPage />} />
        <Route path="case-orders/:caseId" element={<CaseOrderPage />} />
        <Route path="case-orders" element={<CaseSelectorPage title="Case Orders" description="Select a case to view orders" routePrefix="case-orders" />} />
        <Route path="termination/:caseId" element={<TerminationPage />} />
        <Route path="termination" element={<CaseSelectorPage title="Termination" description="Select a case to manage termination" routePrefix="termination" />} />
        <Route path="cause-list" element={<CauseListPage />} />
        <Route path="noting/:caseId" element={<NotingPage />} />
        <Route path="noting" element={<CaseSelectorPage title="Noting" description="Select a case to view noting" routePrefix="noting" />} />
        <Route path="hearings-today" element={<HearingsTodayPage />} />
        <Route path="work-status/pending" element={<WorkStatusPage type="pending" />} />
        <Route path="work-status/completed" element={<WorkStatusPage type="completed" />} />
        <Route path="arbitrator-setup" element={<ArbitratorSetupPage />} />
        <Route path="counsel-setup" element={<CounselSetupPage />} />
        <Route path="short-pink-list" element={<ShortPinkListPage />} />
        <Route path="efiling-users" element={<EfilingUsersPage />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
