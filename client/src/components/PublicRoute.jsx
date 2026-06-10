import { Navigate } from 'react-router-dom';
import { getAuthToken } from '../utils/storage';

export default function PublicRoute({ children }) {
  const token = getAuthToken();
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
