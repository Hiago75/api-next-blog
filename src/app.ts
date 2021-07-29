import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import 'express-async-errors';
import 'reflect-metadata';
import './config/database';

import { errorHandler } from './middlewares/errorHandler';
import { categoryRoutes, authorRoutes, postRoutes, coverRoutes, authRoutes } from './routes/index';

dotenv.config();

class App {
  private _app;

  constructor() {
    this._app = express();
    this.middlewares();
    this.routes();
    this.errorHandler();
  }

  get app() {
    return this._app;
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
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
