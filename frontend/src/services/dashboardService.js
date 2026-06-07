import api from './api';

export const dashboardService = {
  getMetrics: () => api.get('/api/dashboard/metrics'),
};