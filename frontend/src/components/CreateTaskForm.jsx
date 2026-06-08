import React, { useState } from 'react';
import { taskService } from '../services/taskService';

const CreateTaskForm = ({ onTaskCreated }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    projectId: '',
    assignedToId: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await taskService.createTask(formData);
      setSuccess(true);
      setFormData({ title: '', description: '', projectId: '', assignedToId: '' });
      if (onTaskCreated) {
        onTaskCreated();
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Failed to create task'
      );
    }finally {
      setLoading(false);
    }
  };

  if (!showForm) {
    return (
      <button
        onClick={() => setShowForm(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded"
      >
        Create Task
      </button>
    );
  }

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">Task created successfully!</div>}
      <form onSubmit={handleCreateTask}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Task Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter task title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter task description"
            rows="3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Project ID</label>
          <input
            type="text"
            name="projectId"
            value={formData.projectId}
            onChange={(e) => setFormData({...formData, projectId: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter project ID"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Assign to User ID</label>
          <input
            type="text"
            name="assignedToId"
            value={formData.assignedToId}
            onChange={(e) => setFormData({...formData, assignedToId: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded"
            placeholder="Enter user ID to assign task to"
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Task'}
          </button>
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTaskForm;