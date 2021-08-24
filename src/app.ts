import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import translator from 'i18next';
import translatorBackend from 'i18next-fs-backend';
import translatorMiddleware from 'i18next-http-middleware';

import 'express-async-errors';
import 'reflect-metadata';

import { connectToOrm } from './config/database';
import { errorHandler } from './middlewares/errorHandler';
import { categoryRoutes, authorRoutes, postRoutes, coverRoutes, authRoutes, profilePhotoRoutes } from './routes/index';

dotenv.config();

translator
  .use(translatorBackend)
  .use(translatorMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

class App {
  private _app;
  private whiteList = ['https://condescending-hugle-4d401f.netlify.app'];

  constructor() {
    connectToOrm();
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
    this.app.use(translatorMiddleware.handle(translator));
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
    this.app.use('/photo', profilePhotoRoutes);
  }

  errorHandler() {
    this.app.use(errorHandler);
  }
}

export default new App().app;
