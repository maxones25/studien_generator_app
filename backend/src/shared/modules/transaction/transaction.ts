import { EntityManager } from 'typeorm';

export abstract class Transaction<TransactionInput, TransactionOutput> {
  protected entityManager: EntityManager;

  constructor(private privateEntityManager: EntityManager) {}

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
