import app from './app';

const server = app.listen(process.env.APP_PORT, () => console.log('Server is running'));

process.on('SIGINT', () => {
  server.close();
  console.log('Server closed');
});

export { server };
