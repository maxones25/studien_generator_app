import { FormSchedule, Task } from '@entities';
import { Transaction } from '@shared/modules/transaction/transaction';
import { IsNull } from 'typeorm';

type TransactionInput = {
  scheduleId: string;
};

export class DeleteScheduleTransaction extends Transaction<
  TransactionInput,
  number
> {
  protected async execute({ scheduleId }: TransactionInput): Promise<number> {
    const { affected } = await this.deleteSchedule(scheduleId);

    await this.deleteOpenTasks(scheduleId);

    return affected;
  }

  private async deleteSchedule(id: string) {
    const repo = this.entityManager.getRepository(FormSchedule);

    return await repo.delete(id);
  }

  private async deleteOpenTasks(scheduleId: string) {
    const repo = this.entityManager.getRepository(Task);

    await repo.delete({ scheduleId, completedAt: IsNull() });
  }
}
