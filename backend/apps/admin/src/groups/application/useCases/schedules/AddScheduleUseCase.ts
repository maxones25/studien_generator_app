import {
  AddScheduleUseCaseInput,
  IAddScheduleUseCase,
  ISchedulesRepository,
} from '@admin/groups/domain';
import { FormScheduleAttributes, Schedule } from '@entities/core/group';
import { Id } from '@shared/modules/core';
import { BaseAttribute } from '@shared/types/BaseAttribute';

export class AddScheduleUseCase implements IAddScheduleUseCase {
  constructor(private readonly schedulesRepository: ISchedulesRepository) {}

  async execute({
    formConfigId,
    data: {
      period,
      postpone,
      restrict,
      times,
      type,
      amount,
      daysOfMonth,
      daysOfWeek,
      frequency,
    },
  }: AddScheduleUseCaseInput): Promise<Id> {
    const schedule = new Schedule({
      configId: formConfigId,
      period,
      postpone,
      restrict,
      times,
      type,
      amount,
      daysOfMonth,
      daysOfWeek,
      frequency,
    });

    return await this.schedulesRepository.addSchedule(schedule);
  }

  // private async createSchedule(
  //   configId: string,
  //   { type, period, postpone = null, restrict = null, times = [] }: any,
  // ) {
  //   const repo = this.entityManager.getRepository(FormSchedule);

  //   const schedule = new FormSchedule();

  //   schedule.configId = configId;
  //   schedule.type = type;
  //   schedule.period = period;
  //   schedule.postpone = postpone;
  //   schedule.restrict = restrict;
  //   schedule.times = times;

  //   await repo.insert(schedule);

  //   return schedule.id;
  // }

  // private async createAttributes(
  //   scheduleId: string,
  //   attributes: BaseAttribute<FormScheduleAttributes>[],
  // ) {
  //   const repo = this.entityManager.getRepository(FormScheduleAttribute);

  //   for (const { key, value } of attributes) {
  //     await repo.insert({ scheduleId, key, value });
  //   }
  // }

  // private generateAttributes({
  //   type,
  //   period,
  //   frequency,
  //   amount,
  //   daysOfMonth,
  //   daysOfWeek,
  // }: any): BaseAttribute<FormScheduleAttributes>[] {
  //   if (type === FormScheduleType.Fix && period === FormSchedulePeriod.Day) {
  //     return [
  //       {
  //         key: 'frequency',
  //         value: frequency,
  //       },
  //     ];
  //   } else if (
  //     type === FormScheduleType.Fix &&
  //     period === FormSchedulePeriod.Week
  //   ) {
  //     return [
  //       {
  //         key: 'frequency',
  //         value: frequency,
  //       },
  //       {
  //         key: 'daysOfWeek',
  //         value: daysOfWeek,
  //       },
  //     ];
  //   } else if (
  //     type === FormScheduleType.Fix &&
  //     period === FormSchedulePeriod.Month
  //   ) {
  //     return [
  //       {
  //         key: 'frequency',
  //         value: frequency,
  //       },
  //       {
  //         key: 'daysOfMonth',
  //         value: daysOfMonth,
  //       },
  //     ];
  //   } else if (type === FormScheduleType.Flexible) {
  //     return [
  //       {
  //         key: 'amount',
  //         value: amount,
  //       },
  //     ];
  //   }

  //   return [];
  // }
}
