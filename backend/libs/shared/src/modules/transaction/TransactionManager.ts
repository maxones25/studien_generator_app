import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource, EntityManager, QueryRunner } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionManager {
  private queryRunner: QueryRunner;

  constructor(
    @InjectDataSource()
    dataSource: DataSource,
  ) {
    this.queryRunner = dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    if (!this.queryRunner.isTransactionActive) {
      await this.queryRunner.startTransaction();
    }
  }

  async commit(): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      await this.queryRunner.commitTransaction();
    }
  }

  async rollback(): Promise<void> {
    if (this.queryRunner.isTransactionActive) {
      await this.queryRunner.rollbackTransaction();
    }
  }

  getManager(): EntityManager {
    return this.queryRunner.manager;
  }
}
