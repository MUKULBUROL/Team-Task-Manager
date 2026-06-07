import express from 'express';
import { authenticate } from '../middleware/auth.js';
import taskController from '../controllers/taskController.js';

const router = express.Router();
router.use(authenticate);

router.post('/', taskController.create);
router.get('/', taskController.getAll);
router.patch('/:taskId/status', taskController.updateStatus);
router.delete('/:id', taskController.deleteTask);

export default router;