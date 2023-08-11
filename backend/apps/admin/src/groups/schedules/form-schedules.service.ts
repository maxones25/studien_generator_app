import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormSchedule } from '@entities';
import { FormScheduleType } from './enums/FormScheduleType';
import { FormSchedulePeriod } from './enums/FormSchedulePeriod';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';

@Injectable()
export class FormSchedulesService {
  constructor(
    @Inject(FormSchedulesRepository)
    readonly formSchedulesRepository: FormSchedulesRepository,
  ) {}

  async create(configId: string, data: CreateFormScheduleDto) {
    const { type, period, frequency } = data;
    const formSchedule = new FormSchedule();

    formSchedule.configId = configId;
    formSchedule.type = type;
    formSchedule.period = period;
    formSchedule.frequency = frequency;
    formSchedule.data = this.getData(data);

    await this.formSchedulesRepository.insert(formSchedule);

    return formSchedule.id;
  }

  async getAll(configId: string) {
    const schedules = await this.formSchedulesRepository.find({
      where: { configId },
      order: {
        createdAt: 'ASC',
      },
      select: {
        id: true,
        type: true,
        period: true,
        frequency: true,
        data: true,
      },
    });
    return schedules.map(({ data, ...rest }) => ({ ...rest, ...data }));
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

  async delete(id: string) {
    const { affected } = await this.formSchedulesRepository.delete(id);
    return affected;
  }

  private getData({
    type,
    period,
    postpone,
    dayOfMonth,
    days,
    daysInBetween,
    daysOfWeek,
  }: CreateFormScheduleDto) {
    if (type === FormScheduleType.Fix && period === FormSchedulePeriod.Day) {
      return {
        postpone,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Week
    ) {
      return {
        daysOfWeek,
        postpone,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month
    ) {
      return {
        dayOfMonth,
        postpone,
      };
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month
    ) {
      return {
        dayOfMonth,
        postpone,
      };
    } else {
      throw new BadRequestException();
    }
  }
}
