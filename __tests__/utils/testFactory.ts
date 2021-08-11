import { Connection } from 'typeorm';
import mockConnection from './mockConnection';

export const testFactory = () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await mockConnection.create();
  });

  afterEach(async () => {
    await connection.synchronize(true);
  });

  afterAll(async () => {
    await mockConnection.close();
  });

  beforeEach(async () => {
    await mockConnection.clear();
  });
};
