import TaskCard from './TaskCard';
import './Column.css';

export default function Column({ title, description, emptyMessage, status, tasks }) {
  const columnTasks = tasks.filter((t) => t.status === status);

  return (
    <div className="column">
      <div className="column-header">
        <h2 className="column-title">
          {title} <span className="task-count">({columnTasks.length})</span>
        </h2>
        <p className="column-description">{description}</p>
      </div>
      <div className="column-body">
        {columnTasks.length === 0 ? (
          <p className="empty-state">{emptyMessage}</p>
        ) : (
          columnTasks.map((task) => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
