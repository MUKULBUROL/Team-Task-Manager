import { prisma } from '../config/db.js';

export const createTask = async (taskData) => {
  const { title, description, projectId, assignedToId } = taskData;

  return await prisma.task.create({
    data: {
      title,
      description,
      status: 'TODO',
      projectId,
      assignedToId
    }
  });
};

export const getTasks = async (userId, userRole) => {
  if (userRole === 'ADMIN') {
    // Admin can see all tasks
    return await prisma.task.findMany();
  } else {
    // Members can only see tasks assigned to them
    return await prisma.task.findMany({
      where: {
        assignedToId: userId
      }
    });
  }
};

export const updateTaskStatus = async (taskId, status, userId, userRole) => {
  // Check if user is authorized to update this task
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  // Members can only update tasks assigned to them
  if (userRole !== 'ADMIN' && task.assignedToId !== userId) {
    throw new Error('User is not authorized to update this task');
  }

  return await prisma.task.update({
    where: { id: taskId },
    data: { status }
  });
};

export const deleteTask = async (taskId, userId, userRole) => {
  // Only admin or task owner can delete a task
  const task = await prisma.task.findUnique({
    where: { id: taskId }
  });

  if (!task) {
    throw new Error('Task not found');
  }

  // Check if user is authorized to delete this task
  if (userRole !== 'ADMIN') {
    const project = await prisma.project.findUnique({
      where: { id: task.projectId }
    });

    if (!project) {
      throw new Error('Project not found');
    }
  }

  return await prisma.task.delete({
    where: { id: taskId }
  });
};

export default {
  createTask,
  getTasks,
  updateTaskStatus,
  deleteTask
};