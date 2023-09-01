import { Inject, Injectable } from '@nestjs/common';
import { TransactionManager } from './TransactionManager';
import { EntityManager } from 'typeorm';

@Injectable()
export abstract class UseCase<UseCaseInputData, UseCaseOutputData> {
  protected entityManager: EntityManager;

  constructor(
    @Inject(TransactionManager)
    private readonly transactionManager: TransactionManager,
  ) {
    this.entityManager = this.transactionManager.getManager();
  }

  protected abstract execute(
    data: UseCaseInputData,
  ): Promise<UseCaseOutputData>;

  async run(
    input: UseCaseInputData,
  ): Promise<UseCaseOutput<UseCaseOutputData>> {
    try {
      const output = await this.execute(input);

      return new UseCaseOutput<UseCaseOutputData>(
        this.transactionManager,
        output,
      );
    } catch (error) {
      await this.transactionManager.rollback();
      throw error;
    }
  }
}

export class UseCaseOutput<T> {
  constructor(
    private readonly transactionManager: TransactionManager,
    private readonly data: T,
  ) {}

  async commit(): Promise<T> {
    await this.transactionManager.commit();
    return this.data;
  }

  async rollback() {
    await this.transactionManager.rollback();
  }
}
