module.exports = [
  {
    name: 'production',
    type: 'postgres',
    url: process.env.DATABASE_URL,
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
    entities: ['src/entities/*.ts'],
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
