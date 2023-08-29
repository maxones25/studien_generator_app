import { Module, Global } from '@nestjs/common';
import { TransactionManager } from './TransactionManager';
import DbModule from '../db/db.module';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [DbModule],
  providers: [TransactionManager],
  exports: [TransactionManager],
})
export class UseCaseModule {}
