export = {
  type: 'postgres',
  port: 5432,
  host: 'localhost',
  username: 'postgres',
  password: 'postgres',
  database: 'aldo-lanches',
  migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
  entities: ['./src/modules/**/entities/*.ts'],
  cli: {
    migrationsDir: './src/shared/infra/typeorm/migrations',
  },
}
