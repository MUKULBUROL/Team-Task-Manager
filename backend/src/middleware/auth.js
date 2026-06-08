import { verifyToken } from '../utils/auth.js';

export const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const authorizeAdmin = (req, res, next) => {
  // Authorization for admin only
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Access denied. Admin access required.' });
  }
  next();
};

export const authorizeMember = (req, res, next) => {
  // Authorization for members and admins
  next();
};

export default { authenticate, authorizeAdmin, authorizeMember };