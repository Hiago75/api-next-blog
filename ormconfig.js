const connections = {
  production: {
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/entities/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
  development: {
    type: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '123456',
    database: 'personal-blog',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
};

const defaultConnection = connections[process.env.NODE_ENV];

module.exports = [
  {
    ...defaultConnection,
  },
  {
    name: 'production',
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DBNAME,
    migrations: ['dist/database/migrations/*.js'],
    entities: ['dist/entities/*.js'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
  {
    name: 'development',
    type: 'postgres',
    host: 'localhost',
    port: '5432',
    username: 'postgres',
    password: '123456',
    database: 'personal-blog',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts', 'src/modules/**/infra/typeorm/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
  {
    name: 'test',
    type: 'sqlite',
    database: '__tests__/test.sqlite',
    migrations: ['src/database/migrations/*.ts'],
    entities: ['src/entities/*.ts'],
    cli: {
      migrationsDir: 'src/database/migrations',
      entitiesDir: 'src/entities',
    },
  },
];
