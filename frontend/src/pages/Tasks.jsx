import React, { useState, useEffect, useContext } from 'react';
import { taskService } from '../services/taskService';
import { projectService } from '../services/projectService';
import { AuthContext } from '../contexts/AuthContext';
import TaskList from '../components/TaskList';
import CreateTaskForm from '../components/CreateTaskForm';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await taskService.getTasks();
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Tasks</h1>

      {user && user.role === 'ADMIN' && (
        <div className="mb-6">
          <CreateTaskForm />
        </div>
      )}

      <TaskList tasks={tasks} isAdmin={user?.role === 'ADMIN'} />
    </div>
  );
};

export default Tasks;