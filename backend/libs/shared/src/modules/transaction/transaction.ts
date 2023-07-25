import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export abstract class Transaction<TransactionInput, TransactionOutput> {
  protected entityManager: EntityManager;

  constructor(
    @InjectEntityManager()
    private readonly privateEntityManager: EntityManager,
  ) {}

  protected abstract execute(
    data: TransactionInput,
  ): Promise<TransactionOutput>;

  run(data: TransactionInput) {
    return this.privateEntityManager.transaction(async (entityManager) => {
      this.entityManager = entityManager;
      return await this.execute(data);
    });
  }
}
