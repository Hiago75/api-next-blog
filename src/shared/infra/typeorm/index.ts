import { createConnection, getConnectionOptions } from 'typeorm';

export const connectToOrm = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  const connection = createConnection({ ...connectionOptions, name: 'default' });

  return connection;
};

connectToOrm();
