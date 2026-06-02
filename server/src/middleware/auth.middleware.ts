import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    username: string;
  };
}

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authReq = req as AuthenticatedRequest;
  
  // Extract token from cookies or authorization headers
  let token = req.cookies?.token;
  
  if (!token && req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({ error: 'Access denied. Authenticated token is missing.' });
    return;
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    res.status(401).json({ error: 'Session expired or authentication token is invalid.' });
    return;
  }

  authReq.user = decoded;
  next();
};
