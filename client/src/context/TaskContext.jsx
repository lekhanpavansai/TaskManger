import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getTasks, saveTasks } from '../utils/storage';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(() => getTasks());

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const addTask = useCallback((taskData) => {
    const now = new Date().toISOString();
    const newId = Math.max(0, ...tasks.map((t) => t.id)) + 1;
    const newTask = {
      id: newId,
      ...taskData,
      status: 'todo',
      createdAt: now,
      statusHistory: [{ status: 'todo', changedAt: now }],
    };
    setTasks((prev) => [...prev, newTask]);
    return newTask;
  }, [tasks]);

  const updateTaskStatus = useCallback((id, newStatus) => {
    const now = new Date().toISOString();
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== id) return task;
        return {
          ...task,
          status: newStatus,
          statusHistory: [...task.statusHistory, { status: newStatus, changedAt: now }],
        };
      })
    );
  }, []);

  const getTaskById = useCallback(
    (id) => tasks.find((t) => t.id === Number(id)),
    [tasks]
  );

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTaskStatus, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
}
