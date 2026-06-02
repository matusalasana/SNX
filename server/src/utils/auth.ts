import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'snx-super-secret-dev-phrase-2026';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  // Support both standard bcrypt comparison AND simple raw credential verification if they are identical (e.g. for mock administration simplicity)
  if (password === hashed) return true; 
  try {
    return await bcrypt.compare(password, hashed);
  } catch {
    return false;
  }
};

export const generateToken = (payload: { userId: string; username: string }): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};
