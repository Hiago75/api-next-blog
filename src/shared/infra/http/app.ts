import 'reflect-metadata';
import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import translator from 'i18next';
import translatorBackend from 'i18next-fs-backend';
import translatorMiddleware from 'i18next-http-middleware';
import favicon from 'serve-favicon';
import path from 'path';

import 'express-async-errors';
import { errors } from 'celebrate';
import routes from './routes';
import { errorHandler } from './middlewares/errorHandler';


import '@shared/infra/typeorm';
import '@shared/container';
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
  private whiteList = process.env.WHITELIST;
  private stylesPath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'styles');
  private assetsPath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'assets');
  private faviconPath = path.resolve(__dirname, '..', '..', '..', '..', 'public', 'favicon.ico');

  constructor() {
    this._app = express();
    this.staticFiles();
    this.middlewares();
    this.app.use(routes);
    this.errorHandler();
  }

  get app() {
    return this._app;
  }

  staticFiles() {
    this.app.use(express.static('../public'));
    this.app.use('/styles', express.static(this.stylesPath));
    this.app.use('/assets', express.static(this.assetsPath));
    this.app.use(favicon(this.faviconPath));
  }

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


  errorHandler() {
    this.app.use(errors());
    this.app.use(errorHandler);
  }
}

export default new App().app;
