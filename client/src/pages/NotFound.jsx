import { Link } from 'react-router-dom';
import { getAuthToken } from '../utils/storage';
import './NotFound.css';

export default function NotFound() {
  const isLoggedIn = !!getAuthToken();
  const redirectTo = isLoggedIn ? '/dashboard' : '/login';
  const buttonText = isLoggedIn ? 'Go to Dashboard' : 'Go to Login';

  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <div className="not-found-graphic">
          <span className="not-found-code">404</span>
        </div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-message">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to={redirectTo} className="not-found-btn">
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
