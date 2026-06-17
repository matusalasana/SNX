import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { PORT, NODE_ENV } from "./configs/env"
import { connectDB } from "./db"
import { app } from './app';

async function startServer() {
  
  await connectDB();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`👾 SNX Server Running!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`⚙️  Environment: ${NODE_ENV || 'development'}`);
  });
  
};

startServer();
