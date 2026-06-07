import React, { useState } from 'react';
import { taskService } from '../services/taskService';

const TaskCard = ({ task }) => {
  const [taskStatus, setTaskStatus] = useState(task.status);

  const handleStatusChange = async (newStatus) => {
    try {
      await taskService.updateTaskStatus(task.id, { status: newStatus });
      setTaskStatus(newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">{task.title}</h2>
        <span className="px-2 py-1 bg-gray-200 rounded text-sm">{taskStatus}</span>
      </div>
      <p className="mt-2">{task.description}</p>
      <div className="mt-4 flex space-x-2">
        <button
          onClick={() => handleStatusChange('TODO')}
          className={`px-3 py-1 rounded ${taskStatus === 'TODO' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
        >
          Todo
        </button>
        <button
          onClick={() => handleStatusChange('IN_PROGRESS')}
          className={`px-3 py-1 rounded ${taskStatus === 'IN_PROGRESS' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          In Progress
        </button>
        <button
          onClick={() => handleStatusChange('DONE')}
          className={`px-3 py-1 rounded ${taskStatus === 'DONE' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default TaskCard;