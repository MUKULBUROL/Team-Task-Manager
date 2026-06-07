import api from './api';

export const taskService = {
  getTasks: () => api.get('/api/tasks'),
  createTask: (taskData) => api.post('/api/tasks', taskData),
  getTaskById: (id) => api.get(`/api/tasks/${id}`),
  updateTaskStatus: (taskId, status) => api.patch(`/api/tasks/${taskId}/status`, status),
  deleteTask: (id) => api.delete(`/api/tasks/${id}`),
};