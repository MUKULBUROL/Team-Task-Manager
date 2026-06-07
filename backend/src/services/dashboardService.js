import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardMetrics = async () => {
  try {
    // Get total counts
    const totalUsers = await prisma.user.count();
    const totalProjects = await prisma.project.count();
    const totalTasks = await prisma.task.count();

    // Get task status distribution
    const todoTasks = await prisma.task.count({
      where: {
        status: 'TODO'
      }
    });

    const inProgressTasks = await prisma.task.count({
      where: {
        status: 'IN_PROGRESS'
      }
    })

    const doneTasks = await prisma.task.count({
      where: {
        status: 'DONE'
      }
    })

    return {
      totals: {
        users: totalUsers,
        projects: totalProjects,
        tasks: totalTasks
      },
      taskStatusDistribution: {
        todo: todoTasks,
        inProgress: inProgressTasks,
        done: doneTasks
      }
    }
  } catch (error) {
    throw new Error('Error fetching dashboard metrics: ' + error.message);
  }
};

export default {
  getDashboardMetrics
};