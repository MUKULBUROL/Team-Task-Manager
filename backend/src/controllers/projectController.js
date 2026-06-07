import { createProject, getProjects, getProjectById, addMember } from '../services/projectService.js';
import { asyncHandler } from '../middleware/errorHandler.js';

const projectController = {
  create: asyncHandler(async (req, res) => {
    try {
      const project = await createProject(req.body, req.user.id);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  getProjects: asyncHandler(async (req, res) => {
    try {
      const projects = await getProjects(req.user.id, req.user.id, req.user.role);
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }),

  getProjectById: asyncHandler(async (req, res) => {
    try {
      const project = await getProjectById(req.params.id, req.user.id, req.user.role);
      res.json(project);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  addMember: asyncHandler(async (req, res) => {
    try {
      const { projectId, userId } = req.body;
      const member = await addMember(projectId, userId);
      res.json(member);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
};

export default projectController;