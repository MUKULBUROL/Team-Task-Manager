import express from 'express';
import { authenticate } from '../middleware/auth.js';
import dashboardController from '../controllers/dashboardController.js';

const router = express.Router();
router.use(authenticate);

router.get('/metrics', dashboardController.getMetrics);

export default router;