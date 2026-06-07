import { asyncHandler } from '../middleware/errorHandler.js';
import { getDashboardMetrics } from '../services/dashboardService.js';

const dashboardController = {
  getMetrics: asyncHandler(async (req, res) => {
    try {
      const metrics = await getDashboardMetrics();
      res.json(metrics);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
};

export default dashboardController;