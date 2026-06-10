import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { formatDate, formatDateTime, STATUS_LABELS, PRIORITY_LABELS } from '../utils/formatters';
import './TaskDetail.css';

export default function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTaskStatus } = useTasks();
  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="task-detail-page">
        <div className="task-not-found">
          <h2>Task not found</h2>
          <Link to="/dashboard" className="back-link">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus) => {
    if (newStatus !== task.status) {
      updateTaskStatus(task.id, newStatus);
    }
  };

  return (
    <div className="task-detail-page">
      <div className="task-detail-container">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </button>

        <div className="task-detail-card">
          <div className="task-detail-header">
            <h1 className="task-detail-title">{task.title}</h1>
            <span className={`priority-badge priority-${task.priority}`}>
              {PRIORITY_LABELS[task.priority]}
            </span>
          </div>

          <div className="task-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Status</span>
              <select
                className="status-select"
                value={task.status}
                onChange={(e) => handleStatusChange(e.target.value)}
              >
                <option value="todo">To Do</option>
                <option value="inprogress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>
            <div className="meta-item">
              <span className="meta-label">Deadline</span>
              <span className="meta-value">{formatDate(task.deadline)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Created</span>
              <span className="meta-value">{formatDateTime(task.createdAt)}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Priority</span>
              <span className="meta-value">{PRIORITY_LABELS[task.priority]}</span>
            </div>
          </div>

          <div className="task-description-section">
            <h2>Description</h2>
            <p className="task-full-description">{task.description}</p>
          </div>

          <div className="status-history-section">
            <h2>Status History</h2>
            <div className="status-timeline">
              {task.statusHistory.map((entry, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <span className="timeline-status">{STATUS_LABELS[entry.status]}</span>
                    <span className="timeline-date">{formatDateTime(entry.changedAt)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
