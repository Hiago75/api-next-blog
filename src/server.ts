import app from './app';

const server = app.listen(3000);

process.on('SIGINT', () => {
  server.close();
});

export { server };
