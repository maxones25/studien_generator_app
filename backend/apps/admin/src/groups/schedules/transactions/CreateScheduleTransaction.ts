import { Transaction } from '@shared/modules/transaction/transaction';
import { CreateFormScheduleDto } from '../dtos/CreateFormScheduleDto';
import { FormSchedule, FormScheduleAttribute } from '@entities';

type CreateScheduleInput = {
  data: CreateFormScheduleDto;
  attributes: Omit<FormScheduleAttribute, 'schedule' | 'scheduleId'>[];
};

export class CreateScheduleTransaction extends Transaction<
  CreateScheduleInput,
  string
> {
  protected async execute({
    attributes,
    data,
  }: CreateScheduleInput): Promise<string> {
    const scheduleId = await this.createSchedule(data);

    await this.createAttributes(scheduleId, attributes);

    return scheduleId;
  }

  private async createSchedule({
    configId,
    type,
    period,
    postpone = null,
    times = [],
  }: CreateFormScheduleDto) {
    const repo = this.entityManager.getRepository(FormSchedule);

    const schedule = new FormSchedule();

    schedule.configId = configId;
    schedule.type = type;
    schedule.period = period;
    schedule.postpone = postpone;
    schedule.times = times;

    await repo.insert(schedule);

    return schedule.id;
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
}
