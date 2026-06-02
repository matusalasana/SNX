import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

import { connectDB } from "./configs/db"

// Load variables from .env
dotenv.config();

import { app } from './app';

const PORT = 9000;

async function startServer() {
  
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`👾 SNX Server Running!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===============================================`);
  });
  
};

startServer();
