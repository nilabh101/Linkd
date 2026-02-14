import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import { SwipeView } from './pages/dashboard/SwipeView';
import { CuratedView } from './pages/dashboard/CuratedView';
import { ChatView } from './pages/dashboard/ChatView';
import { ProfileView } from './pages/dashboard/ProfileView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />

          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Navigate to="discover" replace />} />
            <Route path="discover" element={<SwipeView />} />
            <Route path="curated" element={<CuratedView />} />
            <Route path="chat" element={<ChatView />} />
            <Route path="profile" element={<ProfileView />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
