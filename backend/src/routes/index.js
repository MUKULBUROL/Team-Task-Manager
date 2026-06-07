import express from 'express';
const router = express.Router();

// Health check route
router.get('/', (req, res) => {
  res.json({ message: 'Team Task Manager API' });
});

export default router;