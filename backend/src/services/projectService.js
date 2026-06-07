import { prisma } from '../config/db.js';

export const createProject = async (projectData, userId) => {
  const { name, description } = projectData;

  // Create project with owner
  const project = await prisma.project.create({
    data: {
      name,
      description,
      ownerId: userId,
    }
  });

  return project;
};

export const getProjects = async (userId, role) => {
  if (role === 'ADMIN') {
    // Admin can see all projects
    return await prisma.project.findMany();
  } else {
    // Members can only see projects they belong to
    return await prisma.project.findMany({
      where: {
        members: {
          some: {
            userId: userId
          }
        }
      }
    });
  }
};

export const getProjectById = async (projectId, userId, userRole) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId }
  });

  return project;
};

export const addMember = async (projectId, userId) => {
  return await prisma.projectMember.create({
    data: {
      projectId,
      userId
    }
  });
};

export default {
  createProject,
  getProjects,
  getProjectById,
  addMember
};