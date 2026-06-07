import { generateToken } from '../utils/auth.js';
import { findUserByEmail, createUser } from '../services/userService.js';
import { comparePasswords } from '../utils/auth.js';
import { asyncHandler } from '../middleware/errorHandler.js';

export const register = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Check if user already exists
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  // Create the user
  const user = await createUser({ email, password, name });

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  res.status(201).json({
    user: userWithoutPassword,
    token: generateToken(userWithoutPassword)
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Check password
  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  // Remove password from response
  const { password: _, ...userWithoutPassword } = user;
  res.json({
    user: userWithoutPassword,
    token: generateToken(userWithoutPassword)
  });
});

export default {
  register,
  login
};