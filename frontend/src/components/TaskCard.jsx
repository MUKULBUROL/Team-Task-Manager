import React, { useState } from 'react';
import { taskService } from '../services/taskService';

const TaskCard = ({ task, isAdmin, onTaskUpdated }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);
  const [error, setError] = useState('');

  const handleStatusChange = async (newStatus) => {
    try {
      setError('');
      await taskService.updateTaskStatus(task.id, { status: newStatus });
      setTaskStatus(newStatus);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error('Failed to update task status:', err);
      setError(err.response?.data?.message || 'Failed to update task status');
    }
  };

  const handleDeleteTask = async () => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      setError('');
      await taskService.deleteTask(task.id);
      if (onTaskUpdated) onTaskUpdated();
    } catch (err) {
      console.error('Failed to delete task:', err);
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow bg-white">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 bg-gray-200 rounded text-sm font-semibold">{taskStatus}</span>
          {isAdmin && (
            <button
              onClick={handleDeleteTask}
              className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <p className="mt-2 text-gray-700">{task.description}</p>
      
      {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleStatusChange('TODO')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            taskStatus === 'TODO' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todo
        </button>
        <button
          onClick={() => handleStatusChange('IN_PROGRESS')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            taskStatus === 'IN_PROGRESS' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange('DONE')}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            taskStatus === 'DONE' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;