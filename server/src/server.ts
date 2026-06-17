import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { CLIENT_ORIGIN } from "./configs/env"

import { connectDB } from "./db"

// Load variables from .env
dotenv.config();

import { app } from './app';

const PORT = 9000;

async function startServer() {
  console.log(CLIENT_ORIGIN)
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`👾 SNX Server Running!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
  });
  
};

startServer();
