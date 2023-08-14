import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormSchedule } from '@entities';
import { FormScheduleType } from './enums/FormScheduleType';
import { FormSchedulePeriod } from './enums/FormSchedulePeriod';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';
import { GetAllSchedulesQueryParams } from './dtos/GetAllSchedulesQueryParams';

@Injectable()
export class FormSchedulesService {
  constructor(
    @Inject(FormSchedulesRepository)
    readonly formSchedulesRepository: FormSchedulesRepository,
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
      },
    });
    return schedules.map(({ data, ...rest }) => ({ ...rest, ...data }));
  }

  async update(body: UpdateFormScheduleDto) {
    const { configId, type, period, frequency } = body;
    const data = this.getData(body) as any;

    const { affected } = await this.formSchedulesRepository.update(configId, {
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
