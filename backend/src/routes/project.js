import express from 'express';
import { authenticate, authorizeAdmin } from '../middleware/auth.js';
import projectController from '../controllers/projectController.js';
import { validate } from '../middleware/validation.js';
import { projectCreateSchema, projectMemberSchema } from '../validations/index.js';

const router = express.Router();
router.use(authenticate);

router.post('/', authorizeAdmin, validate(projectCreateSchema), projectController.create);
router.get('/', projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/add-member', authorizeAdmin, validate(projectMemberSchema), projectController.addMember);

export default router;