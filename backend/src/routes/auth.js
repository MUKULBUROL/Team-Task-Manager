import express from 'express';
import { authenticate } from '../middleware/auth.js';
import userController from '../controllers/userController.js';
import { validate } from '../middleware/validation.js';
import { userRegisterSchema, userLoginSchema } from '../validations/index.js';

const router = express.Router();

router.post('/register', validate(userRegisterSchema), userController.register);
router.post('/login', validate(userLoginSchema), userController.login);

export default router;