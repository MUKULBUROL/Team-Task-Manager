import React, { useState } from 'react';
import { projectService } from '../services/projectService';

const AddMemberForm = ({ projectId, onAddMember }) => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await projectService.addMember({ projectId, userId });
      setSuccess(true);
      setUserId('');
      // Refresh project members
      if (onAddMember) onAddMember();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
        'Failed to add member'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold mb-4">Add Member</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">Member added successfully!</div>}
      <form onSubmit={handleAddMember} className="flex space-x-2">
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded"
          placeholder="Enter user email or ID"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Member'}
        </button>
      </form>
    </div>
  );
};

export default AddMemberForm;