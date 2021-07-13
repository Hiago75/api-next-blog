import express from 'express';
import categoryRoutes from './routes/categoryRoutes';
import 'reflect-metadata';
import './config/database';

class App {
  private _app;

  constructor() {
    this._app = express();
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
    this.app.use('/category', categoryRoutes);
  }
}

export default new App().app;
