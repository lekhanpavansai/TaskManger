import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header({ onAddTask }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="4" fill="#6366f1" />
            <path d="M8 12l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="logo-text">Task Manager</span>
        </div>
      </div>
      <div className="header-right">
        <button className="btn-add-task" onClick={onAddTask}>
          + Add Task
        </button>
        <div className="profile-dropdown" ref={dropdownRef}>
          <button
            className="profile-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="avatar">{user?.name?.charAt(0) || 'U'}</div>
            <span className="profile-name">{user?.name || 'User'}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-user-info">
                <p className="dropdown-name">{user?.name}</p>
                <p className="dropdown-email">{user?.email}</p>
              </div>
              <button className="dropdown-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
