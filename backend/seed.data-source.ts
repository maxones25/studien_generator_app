import { getConfig } from './db.config';
import { DataSource } from 'typeorm';

const datasource = new DataSource(
  getConfig({ migrations: [__dirname + '/migrations/seed/**/*.ts'] }),
); // config is one that is defined in datasource.config.ts file

datasource.initialize();

export default datasource;
