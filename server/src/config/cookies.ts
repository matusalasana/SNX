import { Response } from "express";
import {
  NODE_ENV,
  ACCESS_COOKIE_EXP,
  REFRESH_COOKIE_EXP
} from "./env"

const accessCookieOprions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: 'strict',
  maxAge: ACCESS_COOKIE_EXP,
  path: '/',
};

const refreshCookieOprions = {
  httpOnly: true,
  secure: NODE_ENV === "production",
  sameSite: 'strict',
  maxAge: REFRESH_COOKIE_EXP,
  path: '/',
}



export const setAccessTokenCookie = (res: Response, token: string) => {
  try {
    res.cookie("accessToken", token, accessCookieOprions)
  }catch(err: any){
    console.log("Error setting access token:", err);
    res.status(500).json({
      message: `Error setting access token: ${err}`
    })
  }
};

export const clearAccessTokenCookie = (res: Response) => {
  res.clearCookie('accessToken');
};



export const setRefreshTokenCookie = (res: Response, token: string) => {
  try {
    res.cookie("refreshToken", token, refreshCookieOprions)
  }catch(err: any){
    console.log("Error setting refresh token:", err);
    res.status(500).json({
      message: `Error setting refresh token: ${err}`
    })
  }
};

export const clearRefreshTokenCookie = (res: Response) => {
  res.clearCookie('refreshToken');
};