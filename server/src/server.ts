import express from 'express';
import path from 'path';
import dotenv from 'dotenv';

// Load variables from .env
dotenv.config();

import { app } from './app';

const PORT = 9000;

async function startServer() {

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`===============================================`);
    console.log(`👾 SNX Developers Portfolio Server Running!`);
    console.log(`🌐 Address: http://localhost:${PORT}`);
    console.log(`⚙️  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`===============================================`);
  });
  
};

startServer();
