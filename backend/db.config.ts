import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({
  path: '.env.database',
});

export function getConfig({
  migrations,
}: {
  migrations: string[];
}): DataSourceOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT as string),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    timezone: 'Z',
    extra: {
      connectTimeout: 60000,
    },
    entities: [__dirname + '/libs/entities/src/entities/**/*.entity.ts'],
    migrations,
  };
}
