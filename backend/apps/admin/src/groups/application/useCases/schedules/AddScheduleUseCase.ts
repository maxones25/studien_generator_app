import {
  AddScheduleUseCaseInput,
  DaysOfMonthMustBeDistinctError,
  FlexibleDailyIsInvalidError,
  IAddScheduleUseCase,
  ISchedulesRepository,
} from '@admin/groups/domain';
import {
  FormSchedulePeriod,
  FormScheduleType,
  Schedule,
} from '@entities/core/group';
import array from '@shared/modules/array/isDistinct';
import { Id, Transactional } from '@shared/modules/core';

export class AddScheduleUseCase implements IAddScheduleUseCase {
  constructor(private readonly schedulesRepository: ISchedulesRepository) {}

  @Transactional()
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
    if (type === FormScheduleType.Flexible && period === FormSchedulePeriod.Day)
      throw new FlexibleDailyIsInvalidError();

    if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month &&
      !array.isDistinct(daysOfMonth)
    )
      throw new DaysOfMonthMustBeDistinctError();

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
}
