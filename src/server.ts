import app from './app';

// TODO: create environment variable for port number

const server = app.listen(3000, () => console.log('Server is running'));

process.on('SIGINT', () => {
  server.close();
  console.log('Server closed');
});

export { server };
