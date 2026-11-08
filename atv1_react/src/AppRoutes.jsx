import { Navigate, Route, Routes } from 'react-router';
import { useAuth } from './auth/AuthContext.js';
import FinancePage from './FinancePage.jsx';
import LoginPage from './LoginPage.jsx';

export default function AppRoutes() {
  const { user } = useAuth();
  const homePath = user ? '/financas' : '/login';

  return (
    <Routes>
      <Route path="/" element={<Navigate to={homePath} replace />} />
      <Route
        path="/login"
        element={user ? <Navigate to="/financas" replace /> : <LoginPage />}
      />
      <Route
        path="/financas"
        element={user ? <FinancePage /> : <Navigate to="/login" replace />}
      />
      <Route path="*" element={<Navigate to={homePath} replace />} />
    </Routes>
  );
}
