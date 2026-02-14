import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import { SwipeView } from './pages/dashboard/SwipeView';
import { CuratedView } from './pages/dashboard/CuratedView';
import { ChatView } from './pages/dashboard/ChatView';
import { ConversationView } from './pages/dashboard/ConversationView';
import { ProfileView } from './pages/dashboard/ProfileView';
import { EditProfileView } from './pages/dashboard/EditProfileView';
import { SettingsView } from './pages/dashboard/SettingsView';
import { PremiumView } from './pages/dashboard/PremiumView';

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
            <Route path="chat/:chatId" element={<ConversationView />} />
            <Route path="profile" element={<ProfileView />} />
            <Route path="profile/edit" element={<EditProfileView />} />
            <Route path="premium" element={<PremiumView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
