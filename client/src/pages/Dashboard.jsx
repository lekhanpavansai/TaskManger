import { useState, useMemo } from 'react';
import Header from '../components/Header';
import Column from '../components/Column';
import AddTaskModal from '../components/AddTaskModal';
import { useTasks } from '../context/TaskContext';
import './Dashboard.css';

const COLUMNS = [
  {
    title: 'To Do',
    description: 'Tasks that are yet to be started.',
    emptyMessage: 'No tasks here',
    status: 'todo',
  },
  {
    title: 'In Progress',
    description: 'Tasks currently being actively worked on.',
    emptyMessage: 'No tasks here',
    status: 'inprogress',
  },
  {
    title: 'Done',
    description: 'Completed and verified tasks.',
    emptyMessage: 'No tasks here',
    status: 'done',
  },
];

export default function Dashboard() {
  const { tasks, addTask } = useTasks();
  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch =
        !search ||
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        task.description.toLowerCase().includes(search.toLowerCase());
      const matchesPriority =
        priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [tasks, search, priorityFilter]);

  return (
    <div className="dashboard">
      <Header onAddTask={() => setModalOpen(true)} />

      <div className="dashboard-content">
        <div className="filters">
          <div className="search-wrapper">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Search by title or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className="priority-filter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="columns-container">
          {COLUMNS.map((col) => (
            <Column
              key={col.status}
              title={col.title}
              description={col.description}
              emptyMessage={col.emptyMessage}
              status={col.status}
              tasks={filteredTasks}
            />
          ))}
        </div>
      </div>

      <AddTaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addTask}
      />
    </div>
  );
}
