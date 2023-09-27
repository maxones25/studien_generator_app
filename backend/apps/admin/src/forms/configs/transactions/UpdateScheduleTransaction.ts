import { Transaction } from '@shared/modules/transaction/transaction';
import {
  FormSchedule,
  FormScheduleAttribute,
} from '@entities';
import { UpdateScheduleDto } from '../dtos/UpdateScheduleDto';
import { BaseAttribute } from '@shared/types/BaseAttribute';
import { FormScheduleAttributes } from '@entities/core/group';

type UpdateScheduleInput = {
  scheduleId: string;
  data: UpdateScheduleDto;
  attributes: BaseAttribute<FormScheduleAttributes>[];
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
    { type, period, postpone = null, restrict = null, times = [] }: UpdateScheduleDto,
  ) {
    const repo = this.entityManager.getRepository(FormSchedule);

    const schedule = new FormSchedule();

    schedule.type = type;
    schedule.period = period;
    schedule.postpone = postpone;
    schedule.restrict = restrict;
    schedule.times = times;

    const { affected } = await repo.update(id, schedule);

    return affected;
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

  private async deleteAttributes(scheduleId: string) {
    const repo = this.entityManager.getRepository(FormScheduleAttribute);
    await repo.delete({ scheduleId });
  }
}
