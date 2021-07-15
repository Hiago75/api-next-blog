import express from 'express';
import dotenv from 'dotenv';
import { categoryRoutes, authorRoutes } from './routes/index';
import 'reflect-metadata';
import './config/database';

class App {
  private _app;

  constructor() {
    this._app = express();
    dotenv.config();
    this.middlewares();
    this.routes();
  }

  get app() {
    return this._app;
  }

  middlewares() {
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/categories', categoryRoutes);
    this.app.use('/authors', authorRoutes);
  }
}

export default new App().app;
