import { FormConfiguration, ParticipantAttribute, Task } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { StartStudyDto } from '../dtos/StartStudyDto';

type TransactionInput = {
  participantId: string;
  tasks: Task[];
  startDate: Date;
};

export class StartParticipantStudyTransaction extends Transaction<
  TransactionInput,
  void
> {
  protected async execute({
    participantId,
    tasks,
    startDate,
  }: TransactionInput): Promise<void> {
    await this.addAttributes(participantId, startDate);
    await this.generateTasks(tasks);
  }

  private async addAttributes(participantId: string, startDate: Date) {
    const repo = this.entityManager.getRepository(ParticipantAttribute);

    await repo.insert({
      participantId,
      key: 'startedAt',
      value: JSON.stringify(startDate.toISOString()) as any,
    });
  }

  private async generateTasks(tasks: Task[]) {
    const repo = this.entityManager.getRepository(Task);

    for (const task of tasks) {
      await repo.insert(task);
    }
  }
}
