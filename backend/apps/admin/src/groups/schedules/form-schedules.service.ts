import { Inject, Injectable } from '@nestjs/common';
import { CreateFormScheduleDto } from './dtos/CreateFormScheduleDto';
import { FormSchedulesRepository } from './form-schedules.repository';
import { FormScheduleAttribute } from '@entities';
import { FormScheduleType } from './enums/FormScheduleType';
import { FormSchedulePeriod } from './enums/FormSchedulePeriod';
import { UpdateFormScheduleDto } from './dtos/UpdateFormScheduleDto';
import { GetAllSchedulesQueryParams } from './dtos/GetAllSchedulesQueryParams';
import { DeleteScheduleTransaction } from './transactions/DeleteScheduleTransaction';
import { CreateScheduleTransaction } from './transactions/CreateScheduleTransaction';
import { UpdateScheduleTransaction } from './transactions/UpdateScheduleTransaction';

@Injectable()
export class FormSchedulesService {
  constructor(
    @Inject(FormSchedulesRepository)
    readonly formSchedulesRepository: FormSchedulesRepository,
    @Inject(CreateScheduleTransaction)
    readonly createScheduleTransaction: CreateScheduleTransaction,
    @Inject(UpdateScheduleTransaction)
    readonly updateScheduleTransaction: UpdateScheduleTransaction,
    @Inject(DeleteScheduleTransaction)
    readonly deleteScheduleTransaction: DeleteScheduleTransaction,
  ) {}

  async create(data: CreateFormScheduleDto) {
    const attributes = this.generateAttributes(data);
    return this.createScheduleTransaction.run({ data, attributes });
  }

  async getByForm({ formId }: GetAllSchedulesQueryParams) {
    return this.formSchedulesRepository.getByForm(formId);
  }

  async getActiveByGroup(groupId: string) {
    return this.formSchedulesRepository.getActiveByGroup(groupId);
  }

  async update(scheduleId: string, data: UpdateFormScheduleDto) {
    const attributes = this.generateAttributes(data);
    return this.updateScheduleTransaction.run({ scheduleId, data, attributes });
  }

  async delete(scheduleId: string) {
    return await this.deleteScheduleTransaction.run({ scheduleId });
  }

  private generateAttributes({
    type,
    period,
    frequency,
    amount,
    daysOfMonth,
    daysOfWeek,
  }: CreateFormScheduleDto): Omit<
    FormScheduleAttribute,
    'scheduleId' | 'schedule'
  >[] {
    if (type === FormScheduleType.Fix && period === FormSchedulePeriod.Day) {
      return [
        {
          key: 'frequency',
          value: frequency,
        },
      ];
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Week
    ) {
      return [
        {
          key: 'frequency',
          value: frequency,
        },
        {
          key: 'daysOfWeek',
          value: daysOfWeek,
        },
      ];
    } else if (
      type === FormScheduleType.Fix &&
      period === FormSchedulePeriod.Month
    ) {
      return [
        {
          key: 'frequency',
          value: frequency,
        },
        {
          key: 'daysOfMonth',
          value: daysOfMonth,
        },
      ];
    } else if (type === FormScheduleType.Flexible) {
      return [
        {
          key: 'amount',
          value: amount,
        },
      ];
    }

    return [];
  }
}
