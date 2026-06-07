import { asyncHandler } from '../middleware/errorHandler.js';
import { createTask, getTasks, updateTaskStatus, deleteTask } from '../services/taskService.js';

const taskController = {
  create: asyncHandler(async (req, res) => {
    try {
      const task = await createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  getAll: asyncHandler(async (req, res) => {
    try {
      const tasks = await getTasks(req.user.id, req.user.role);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }),

  updateStatus: asyncHandler(async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const task = await updateTaskStatus(taskId, status, req.user.id, req.user.role);
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }),

  deleteTask: asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const task = await deleteTask(id, req.user.id, req.user.role);
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  })
};

export default taskController;