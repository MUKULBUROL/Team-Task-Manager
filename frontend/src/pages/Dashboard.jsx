import React, { useState, useEffect } from 'react';
import { dashboardService } from '../services/dashboardService';

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await dashboardService.getMetrics();
        setMetrics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      {metrics && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Users</h2>
              <p className="text-3xl font-bold text-blue-600">{metrics.totals.users}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-2">Total Projects</h2>
              <p className="text-3xl font-bold text-green-600">{metrics.totals.projects}</p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-regular mb-2">Total Tasks</h2>
              <p className="text-3xl font-bold text-purple-600">{metrics.totals.tasks}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Task Status Distribution</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="text-lg font-semibold">Todo</h3>
                <p className="text-2xl font-bold">{metrics.taskStatusDistribution.todo}</p>
              </div>
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="text-lg font-semibold">In Progress</h3>
                <p className="text-2xl font-bold">{metrics.taskStatusDistribution.inProgress}</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="text-lg font-semibold">Done</h3>
                <p className="text-2xl font-bold">{metrics.taskStatusDistribution.done}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;