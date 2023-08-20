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
    const { configId, type, period, frequency, times } = data;
    const formSchedule = new FormSchedule();

    formSchedule.configId = configId;
    formSchedule.type = type;
    formSchedule.period = period;
    formSchedule.frequency = frequency;
    formSchedule.times = times.sort((a, b) => (a < b ? -1 : 0));
    formSchedule.data = this.getData(data);

    await this.formSchedulesRepository.insert(formSchedule);

    return formSchedule.id;
  }

  async getByForm({ formId }: GetAllSchedulesQueryParams) {
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
        times: true,
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

  async getActiveByGroup(groupId: string) {
    const schedules = await this.formSchedulesRepository.find({
      where: {
        config: {
          groupId,
          isActive: true,
        },
      },
      relations: {
        config: true,
      },
      select: {
        id: true,
        type: true,
        period: true,
        frequency: true,
        data: true,
        times: true,
        config: {
          formId: true,
        },
      },
    });
    return schedules.map(({ data, configId, ...rest }) => ({
      ...rest,
      ...data,
    }));
  }

  async update(id: string, body: UpdateFormScheduleDto) {
    const { type, period, frequency, times } = body;
    const data = this.getData(body) as any;

    const { affected } = await this.formSchedulesRepository.update(id, {
      type,
      period,
      frequency,
      times: times.sort((a, b) => (a < b ? -1 : 0)),
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
  }: CreateFormScheduleDto) {
    const dayOfMonth = rawDayOfMonth?.sort((a, b) => (a < b ? -1 : 0));
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
