import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/auth';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {
    let token = req.cookies?.token;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("No token");
      return res.status(401).json({ error: "Missing token" });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      console.log("Decoded is null");
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded as any;

    next();
  } catch (err) {
    console.error("requireAuth error:", err);
    return res.status(401).json({ error: "Token verification failed" });
  }
};