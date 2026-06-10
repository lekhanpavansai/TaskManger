import { useState } from 'react';
import './AddTaskModal.css';

const EMPTY_FORM = { title: '', description: '', priority: 'medium', deadline: '' };

export default function AddTaskModal({ isOpen, onClose, onSubmit }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (form.title.length > 50) {
      newErrors.title = 'Title must be at most 50 characters';
    }
    if (form.description.length > 200) {
      newErrors.description = 'Description must be at most 200 characters';
    }
    if (!form.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const selected = new Date(form.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected <= today) {
        newErrors.deadline = 'Deadline must be a future date';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      title: form.title.trim(),
      description: form.description.trim(),
      priority: form.priority,
      deadline: form.deadline,
    });
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const handleClose = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    onClose();
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add New Task</h2>
          <button className="modal-close" onClick={handleClose} aria-label="Close">
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter task title"
              maxLength={50}
            />
            {errors.title && <span className="error-text">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter task description (optional)"
              rows={4}
              maxLength={200}
            />
            {errors.description && <span className="error-text">{errors.description}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline *</label>
              <input
                id="deadline"
                type="date"
                value={form.deadline}
                min={minDate}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              />
              {errors.deadline && <span className="error-text">{errors.deadline}</span>}
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
