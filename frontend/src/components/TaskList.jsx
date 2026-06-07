import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import ErrorMessage from './ErrorMessage';
import LoadingSpinner from './LoadingSpinner';

const TaskList = ({ tasks, error, loading }) => {
  if (loading) return <LoadingSpinner />;

  if (error) return <ErrorMessage message={error} />;

  if (!tasks || tasks.length === 0) {
    return <EmptyState message="No tasks found" />;
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;