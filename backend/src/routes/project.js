import express from 'express';
import { authenticate } from '../middleware/auth.js';
import projectController from '../controllers/projectController.js';

const router = express.Router();
router.use(authenticate);

router.post('/', projectController.create);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/add-member', projectController.addMember);

export default router;