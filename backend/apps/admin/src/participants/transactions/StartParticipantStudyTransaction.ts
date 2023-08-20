import { ParticipantAttribute, Task } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { StartStudyDto } from '../dtos/StartStudyDto';

type TransactionInput = {
  studyId: string;
  participantId: string;
  data: StartStudyDto;
};

export class StartParticipantStudyTransaction extends Transaction<
  TransactionInput,
  void
> {
  protected async execute({
    participantId,
    data,
  }: TransactionInput): Promise<void> {
    await this.addAttributes(participantId, data);
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

  private async generateTasks() {
    const repo = this.entityManager.getRepository(Task);

    const formId = null;
    const participantId = null;
    const scheduledAt = null;
    const rescheduled = 0;

    repo.insert({
      formId,
      participantId,
      originalScheduledAt: scheduledAt,
      scheduledAt,
      rescheduled,
    });
  }
}