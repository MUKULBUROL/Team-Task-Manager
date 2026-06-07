import { prisma } from '../config/db.js';
import bcrypt from 'bcrypt';

export const createUser = async (userData) => {
  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  userData.password = hashedPassword;

  return await prisma.user.create({
    data: userData
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email }
  });
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id }
  });
};

export const updateUserRole = async (userId, role) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { role }
  });
};

export default {
  createUser,
  findUserByEmail,
  findUserById,
  updateUserRole
};