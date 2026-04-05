import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/authStore'
import Layout from './components/Layout'

import HomePage          from './pages/HomePage'
import LoginPage         from './pages/LoginPage'
import RegisterPage      from './pages/RegisterPage'
import DashboardPage     from './pages/DashboardPage'
import AssessmentPage    from './pages/AssessmentPage'
import RoadmapPage       from './pages/RoadmapPage'
import ChatPage          from './pages/ChatPage'
import ScholarshipPage   from './pages/ScholarshipsPage'
import CollegesPage      from './pages/CollegesPage'
import ExamsPage         from './pages/ExamsPage'
import IndiaCareersPage  from './pages/IndiaCareersPage'
import ProfilePage       from './pages/ProfilePage'

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}
function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: { background:'#111827', color:'#f1f5f9', border:'1px solid rgba(255,255,255,0.08)', borderRadius:'12px', fontSize:'14px' },
        success: { iconTheme: { primary:'#14b8a6', secondary:'#111827' } },
        error:   { iconTheme: { primary:'#ef4444', secondary:'#111827' } },
      }} />
      <Routes>
        {/* Public pages with Layout (Navbar+Footer) */}
        <Route element={<Layout />}>
          <Route path="/"              element={<HomePage />} />
          <Route path="/careers-india" element={<IndiaCareersPage />} />
          <Route path="/exams"         element={<ExamsPage />} />
          <Route path="/colleges"      element={<CollegesPage />} />
          <Route path="/scholarships"  element={<ScholarshipsPage />} />
          <Route path="/assessment"    element={<AssessmentPage />} />
          <Route path="/roadmap"       element={<PrivateRoute><RoadmapPage /></PrivateRoute>} />
          <Route path="/chat"          element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="/dashboard"     element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="/profile"       element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Route>

        {/* Auth pages — no layout */}
        <Route path="/login"    element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><RegisterPage /></PublicRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}