import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormSchedule } from '@entities';
import { FormScheduleType } from './enums/FormScheduleType';
import { FormSchedulePeriod } from './enums/FormSchedulePeriod';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';
import { GetAllSchedulesQueryParams } from './dtos/GetAllSchedulesQueryParams';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';

@Injectable()
export class FormSchedulesService {
  constructor(
    @Inject(FormSchedulesRepository)
    readonly formSchedulesRepository: FormSchedulesRepository,
    @Inject(DeleteScheduleTransaction)
    readonly deleteScheduleTransaction: DeleteScheduleTransaction,
  ) {}

  async create(data: CreateFormScheduleDto) {
    const { configId, type, period, frequency } = data;
    const formSchedule = new FormSchedule();

    formSchedule.configId = configId;
    formSchedule.type = type;
    formSchedule.period = period;
    formSchedule.frequency = frequency;
    formSchedule.data = this.getData(data);

    await this.formSchedulesRepository.insert(formSchedule);

    return formSchedule.id;
  }

  async getAll({ formId }: GetAllSchedulesQueryParams) {
    const schedules = await this.formSchedulesRepository.find({
      where: { configId: formId },
      order: {
        createdAt: 'ASC',
      },
      select: {
        id: true,
        type: true,
        period: true,
        frequency: true,
        data: true,
        configId: true,
      },
    });
    return schedules.map(({ data, configId, ...rest }) => ({
      ...rest,
      formId: configId,
      ...data,
    }));
  }

  async update(id: string, body: UpdateFormScheduleDto) {
    const { type, period, frequency } = body;
    const data = this.getData(body) as any;

    const { affected } = await this.formSchedulesRepository.update(id, {
      type,
      period,
      frequency,
      data,
    });

    return affected;
  }

  async delete(scheduleId: string) {
    return await this.deleteScheduleTransaction.run({ scheduleId });
  }

  private getData({
    type,
    period,
    postpone,
    dayOfMonth: rawDayOfMonth,
    daysOfWeek,
    times: rawTimes,
  }: CreateFormScheduleDto) {
    const times = rawTimes.sort((a, b) => (a < b ? -1 : 0));
    const dayOfMonth = rawDayOfMonth?.sort((a, b) => (a < b ? -1 : 0));
    if (type === FormScheduleType.Fix && period === FormSchedulePeriod.Day) {
      return {
        postpone,
        times,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Week
    ) {
      return {
        daysOfWeek,
        postpone,
        times,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month
    ) {
      return {
        dayOfMonth,
        postpone,
        times,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month
    ) {
      return {
        dayOfMonth,
        postpone,
        times,
      };
    } else {
      throw new BadRequestException();
    }
  }
}
