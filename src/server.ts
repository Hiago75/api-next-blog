import app from './app';
import 'reflect-metadata';
import './config/database';

const server = app.listen(3000);

process.on('SIGINT', () => {
  server.close();
});

export { server };
