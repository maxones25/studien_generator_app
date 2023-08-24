import { Transaction } from '@shared/modules/transaction/transaction';
import { FormSchedule, FormScheduleAttribute } from '@entities';
import { UpdateFormScheduleDto } from '../dtos/UpdateFormScheduleDto';

type UpdateScheduleInput = {
  scheduleId: string;
  data: UpdateFormScheduleDto;
  attributes: Omit<FormScheduleAttribute, 'schedule' | 'scheduleId'>[];
};

export class UpdateScheduleTransaction extends Transaction<
  UpdateScheduleInput,
  number
> {
  protected async execute({
    scheduleId,
    attributes,
    data,
  }: UpdateScheduleInput): Promise<number> {
    const affected = await this.updateSchedule(scheduleId, data);

    await this.deleteAttributes(scheduleId);

    await this.createAttributes(scheduleId, attributes);

    return affected;
  }

  private async updateSchedule(
    id: string,
    {
      configId,
      type,
      period,
      postpone = null,
      times = [],
    }: UpdateFormScheduleDto,
  ) {
    const repo = this.entityManager.getRepository(FormSchedule);

    const schedule = new FormSchedule();

    schedule.configId = configId;
    schedule.type = type;
    schedule.period = period;
    schedule.postpone = postpone;
    schedule.times = times;

    const { affected } = await repo.update(id, schedule);

    return affected;
  }

  private async createAttributes(
    scheduleId: string,
    attributes: Omit<FormScheduleAttribute, 'schedule' | 'scheduleId'>[],
  ) {
    const repo = this.entityManager.getRepository(FormScheduleAttribute);

    for (const { key, value } of attributes) {
      await repo.insert({ scheduleId, key, value });
    }
  }

  private async deleteAttributes(scheduleId: string) {
    const repo = this.entityManager.getRepository(FormScheduleAttribute);
    await repo.delete({ scheduleId });
  }
}
