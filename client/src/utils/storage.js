import { INITIAL_TASKS } from './initialTasks';

const AUTH_TOKEN_KEY = 'authToken';
const USER_KEY = 'user';
const TASKS_KEY = 'tasks';

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setAuthToken = (token) => localStorage.setItem(AUTH_TOKEN_KEY, token);

export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_KEY);

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const setUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));

export const removeUser = () => localStorage.removeItem(USER_KEY);

export const clearAuth = () => {
  removeAuthToken();
  removeUser();
};

export const getTasks = () => {
  const raw = localStorage.getItem(TASKS_KEY);
  if (raw) {
    return JSON.parse(raw);
  }
  localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_TASKS));
  return INITIAL_TASKS;
};

export const saveTasks = (tasks) => {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};
