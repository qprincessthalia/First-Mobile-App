// Shows a saved date as "September 30, 2026".
export function formatDate(isoString) {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

// A task is overdue when it is not completed and its deadline has passed.
export function isOverdue(task) {
  return task.status !== 'Completed' && new Date(task.deadline) < new Date();
}
