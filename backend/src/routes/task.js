import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import taskController from '../controllers/taskController.js';
import { validate } from '../middleware/validation.js';
import { taskCreateSchema, taskUpdateSchema } from '../validations/index.js';

const router = express.Router();
router.use(authenticate);

router.post('/', authorizeAdmin, validate(taskCreateSchema), taskController.create);
router.get('/', taskController.getAll);
router.patch('/:taskId/status', validate(taskUpdateSchema), taskController.updateStatus);
router.delete('/:id', authorizeAdmin, taskController.deleteTask);

export default router;