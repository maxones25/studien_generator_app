import { DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config({
  path: '.env.database',
});

const dataSource: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  timezone: "Z",
  entities: [__dirname + '/libs/entities/src/*.entity.ts'],
};

export function getConfig() {
  return dataSource;
}
