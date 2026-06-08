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

  // Automatically add owner as project member
  await prisma.projectMember.create({
    data: {
      projectId: project.id,
      userId: userId
  }
});

  return project;
};

export const getProjects = async (userId, role) => {
  if (role === 'ADMIN') {
  return await prisma.project.findMany({
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    }
  });
} else {
    // Members can only see projects they belong to
    return await prisma.project.findMany({
    where: {
      members: {
        some: {
          userId: userId
        }
      }
    },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    }
  });
  }
};

export const getProjectById = async (projectId, userId, userRole) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true
            }
          }
        }
      }
    }
  });

  return project;
};

export const addMember = async (projectId, emailOrId) => {
  let user;
  if (emailOrId.includes('@')) {
    user = await prisma.user.findUnique({
      where: { email: emailOrId }
    });
  } else {
    user = await prisma.user.findUnique({
      where: { id: emailOrId }
    });
  }

  if (!user) {
    throw new Error('User not found');
  }

  // Check if user is already a member of this project
  const existingMember = await prisma.projectMember.findUnique({
    where: {
      projectId_userId: {
        projectId,
        userId: user.id
      }
    }
  });

  if (existingMember) {
    throw new Error('User is already a member of this project');
  }

  return await prisma.projectMember.create({
    data: {
      projectId,
      userId: user.id
    }
  });
};

export default {
  createProject,
  getProjects,
  getProjectById,
  addMember
};