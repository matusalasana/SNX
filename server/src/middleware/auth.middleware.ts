import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const requireAuth = (
  req: Request, 
  res: Response, 
  next: NextFunction) => {
  
  // Extract token from cookies or authorization headers
  let token = req.cookies?.token;
  
  if (!token && req.headers.authorization) {
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

  req.user = decoded as string
  next();
};
