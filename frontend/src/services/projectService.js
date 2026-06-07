import api from './api';

export const projectService = {
  getProjects: () => api.get('/api/projects'),
  getProjectById: (id) => api.get(`/api/projects/${id}`),
  createProject: (projectData) => api.post('/api/projects', projectData),
  addMember: (memberData) => api.post('/api/projects/add-member', memberData),
};