import { Transaction } from '@shared/modules/transaction/transaction';
import { AddScheduleDto } from '../dtos/AddScheduleDto';
import {
  FormSchedule,
  FormScheduleAttribute,
} from '@entities';
import { BaseAttribute } from '@shared/types/BaseAttribute';
import { FormScheduleAttributes } from '@entities/core/group';

type CreateScheduleInput = {
  configId: string;
  data: AddScheduleDto;
  attributes: BaseAttribute<FormScheduleAttributes
  >[];
};

export class CreateScheduleTransaction extends Transaction<
  CreateScheduleInput,
  string
> {
  protected async execute({
    configId,
    attributes,
    data,
  }: CreateScheduleInput): Promise<string> {
    const scheduleId = await this.createSchedule(configId, data);

    await this.createAttributes(scheduleId, attributes);

    return scheduleId;
  }

  private async createSchedule(
    configId: string,
    {
      type,
      period,
      postpone = null,
      restrict = null,
      times = [],
    }: AddScheduleDto,
  ) {
    const repo = this.entityManager.getRepository(FormSchedule);

    const schedule = new FormSchedule();

    schedule.configId = configId;
    schedule.type = type;
    schedule.period = period;
    schedule.postpone = postpone;
    schedule.restrict = restrict;
    schedule.times = times;

    await repo.insert(schedule);

    return schedule.id;
  }

  private async createAttributes(
    scheduleId: string,
    attributes: BaseAttribute<FormScheduleAttributes>[],
  ) {
    const repo = this.entityManager.getRepository(FormScheduleAttribute);

    for (const { key, value } of attributes) {
      await repo.insert({ scheduleId, key, value });
    }
  }
}
