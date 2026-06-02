import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import {
  NODE_ENV,
  COOKIE_MAX_AGE
} from "../../configs/env"

const login = async (req: Request, res: Response) => {
  try {
    const { user, token } = await AuthService.loginUser(req.body);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE
    });

    res.status(200).json({
      message: 'Successfully logged in to portfolio session',
      user,
      token // For testing purpose
    });
  } catch (err: any) {
    console.log("Login error:", err.message);
    res.status(401).json({ error: err.message });
  }
};

const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({ message: 'Session closed successfully' });
};

const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ error: 'Session not authenticated.' });
    return;
  }
  
  try {
    const user = await AuthService.getMe(req.user.userId);
    res.json({
      authenticated: true,
      user
    });
  } catch (err: any) {
    console.log("GetMe error:", err.message);
    res.status(404).json({ error: err.message });
  }
};



const register = async(req: Request, res: Response) => {
  try{
    const { user, token } = await AuthService.register(req.body);
    res.status(201).json({
      user,
      token
    })
  }catch(err){
    console.log("Register error:", err.message);
    res.status(400).json({
      message: err.message
    })
  }
}



export const AuthController = {
  login,
  logout,
  getMe,
  register
};
