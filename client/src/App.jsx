import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TaskDetail from './pages/TaskDetail';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/task/:id"
              element={
                <ProtectedRoute>
                  <TaskDetail />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TaskProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
