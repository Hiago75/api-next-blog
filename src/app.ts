import express from 'express';

class App {
  private _app;

  constructor() {
    this._app = express();
    this.routes();
  }

  get app() {
    return this._app;
  }

  routes() {
    this.app.get('/', (_request, response) => {
      response.json('Hello world');
    });
  }
}

export default new App().app;
