import { FormConfiguration, ParticipantAttribute, Task } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { StartStudyDto } from '../dtos/StartStudyDto';

type TransactionInput = {
  participantId: string;
  tasks: Task[];
  data: StartStudyDto;
};

export class StartParticipantStudyTransaction extends Transaction<
  TransactionInput,
  void
> {
  protected async execute({
    participantId,
    tasks,
    data,
  }: TransactionInput): Promise<void> {
    await this.addAttributes(participantId, data);
    await this.generateTasks(tasks);
  }

  private async addAttributes(
    participantId: string,
    { startDate }: StartStudyDto,
  ) {
    const repo = this.entityManager.getRepository(ParticipantAttribute);

    await repo.insert({
      participantId,
      key: 'startedAt',
      value: JSON.stringify(startDate) as any,
    });
  }

  private async generateTasks(tasks: Task[]) {
    const repo = this.entityManager.getRepository(Task);

    for (const task of tasks) {
      await repo.insert(task);
    }
  }
}
