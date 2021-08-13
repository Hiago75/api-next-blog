import { createConnection, getConnection, getConnectionOptions } from 'typeorm';

export const mockConnection = {
  async create() {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
    const connection = createConnection({ ...connectionOptions, name: 'default' });

    return connection;
  },

  async close() {
    getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const entityDeletionPromises = entities.map((entity) => async () => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await Promise.all(entityDeletionPromises);
  },
};

export default mockConnection;
