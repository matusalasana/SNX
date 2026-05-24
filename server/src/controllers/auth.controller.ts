import { Request, Response } from "express";
import { User } from "../models/User.model";
import { 
  hashPassword,
  hashToken
} from "../utils/hash";
import { 
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt";
import { 
  setAccessTokenCookie,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  clearAccessTokenCookie
} from "../config/cookies";

// REGISTER
const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      console.log("Missing required fields")
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      console.log("User already exists")
      return res.status(400).json({
        message: "User already exists",
      });
    }
    
    const hashedPassword = await hashPassword(password);
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role
    }
    const accessToken = await generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(payload);
    const hashedToken = await hashToken(refreshToken);
    
    await User.updateOne(
      { email: user.email },
      { $set: {refreshToken: hashedToken} }
    );
    
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);

    return res
      .status(201)
      .json({
      message: "User registered successfully",
      refreshToken: refreshToken,
      accessToken: accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};


export const AuthController = {
  register
}