import { useNavigate } from 'react-router-dom';
import { formatDate, truncateText } from '../utils/formatters';
import './TaskCard.css';

export default function TaskCard({ task }) {
  const navigate = useNavigate();

  return (
    <div className="task-card" onClick={() => navigate(`/task/${task.id}`)}>
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{truncateText(task.description)}</p>
      <div className="task-card-footer">
        <span className={`priority-badge priority-${task.priority}`}>
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
        <span className="task-deadline">{formatDate(task.deadline)}</span>
      </div>
    </div>
  );
}
