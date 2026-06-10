export function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncateText(text, maxLength = 80) {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export const STATUS_LABELS = {
  todo: 'To Do',
  inprogress: 'In Progress',
  done: 'Done',
};

export const PRIORITY_LABELS = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};
