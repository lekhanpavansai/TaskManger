import { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, getUser, clearAuth, setAuthToken, setUser } from '../utils/storage';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(getAuthToken());
  const [user, setUserState] = useState(getUser());

  useEffect(() => {
    setToken(getAuthToken());
    setUserState(getUser());
  }, []);

  const login = (authToken, userData) => {
    setAuthToken(authToken);
    setUser(userData);
    setToken(authToken);
    setUserState(userData);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUserState(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
