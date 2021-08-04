import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import 'express-async-errors';
import 'reflect-metadata';
import './config/database';

import { errorHandler } from './middlewares/errorHandler';
import { categoryRoutes, authorRoutes, postRoutes, coverRoutes, authRoutes } from './routes/index';

dotenv.config();

class App {
  private _app;
  private whiteList = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'https://condescending-hugle-4d401f.netlify.app',
  ];

  constructor() {
    this._app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  get app() {
    return this._app;
  }

  // TODO on production: Add restrition for my aplication URL on cors
  middlewares() {
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(
      cors({
        credentials: true,
        origin: this.whiteList,
      }),
    );
  }

  routes() {
    this.app.use('/categories', categoryRoutes);
    this.app.use('/authors', authorRoutes);
    this.app.use('/posts', postRoutes);
    this.app.use('/covers', coverRoutes);
    this.app.use('/auth', authRoutes);
  }

  errorHandler() {
    this.app.use(errorHandler);
  }
}

export default new App().app;
