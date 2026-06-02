import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { checkIsMockDatabase } from '../../db/client';

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: 'Username and password are required credentials' });
      return;
    }

    const { user, token } = await AuthService.loginUser(username, password);

    // Support secure cookies
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.json({
      message: 'Successfully logged in to portfolio session',
      user,
      token // Return token fallback for REST client headers
    });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req: Request, res: Response): Promise<void> => {
  res.clearCookie('token');
  res.json({ message: 'Session closed successfully' });
};

const verifyMe = async (req: Request, res: Response): Promise<void> => {
  const authReq = req as any;
  if (!authReq.user) {
    res.status(401).json({ error: 'Session not authenticated.' });
    return;
  }
  
  try {
    const user = await AuthService.verifyUserById(authReq.user.userId);
    res.json({
      authenticated: true,
      user,
      isDemo: checkIsMockDatabase()
    });
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

const getDatabaseStatus = async (req: Request, res: Response): Promise<void> => {
  res.json({
    isMockMode: checkIsMockDatabase(),
    databaseUrlSet: !!process.env.DATABASE_URL,
    provider: 'Neon Serverless Postgres / In-Memory Ingress'
  });
};

export const AuthController = {
  login,
  logout,
  verifyMe,
  getDatabaseStatus
};
