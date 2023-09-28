import {
  DaysOfMonthMustBeDistinctError,
  FlexibleDailyIsInvalidError,
  ISchedulesRepository,
  IUpdateScheduleUseCase,
  UpdateScheduleUseCaseInput,
} from '@admin/groups/domain';
import {
  FormSchedulePeriod,
  FormScheduleType,
  Schedule,
} from '@entities/core/group';
import array from '@shared/modules/array/isDistinct';
import { Transactional } from '@shared/modules/core';

export class UpdateScheduleUseCase implements IUpdateScheduleUseCase {
  constructor(private readonly schedulesRepository: ISchedulesRepository) {}

  @Transactional()
  execute({
    scheduleId,
    data: {
      type,
      period,
      times,
      postpone,
      restrict,
      amount,
      daysOfMonth,
      daysOfWeek,
      frequency,
    },
  }: UpdateScheduleUseCaseInput): Promise<number> {
    if (type === FormScheduleType.Flexible && period === FormSchedulePeriod.Day)
      throw new FlexibleDailyIsInvalidError();

    if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month &&
      !array.isDistinct(daysOfMonth)
    )
      throw new DaysOfMonthMustBeDistinctError();

    const schedule = new Schedule({
      id: scheduleId,
      type,
      period,
      times,
      postpone,
      restrict,
      amount,
      daysOfMonth,
      daysOfWeek,
      frequency,
    });

    return this.schedulesRepository.updateSchedule(schedule);
  }
}
