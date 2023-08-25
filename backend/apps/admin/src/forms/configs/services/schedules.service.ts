import { Inject, Injectable } from '@nestjs/common';
import { AddScheduleDto } from '../dtos/AddScheduleDto';
import { SchedulesRepository } from '../repositories/schedules.repository';
import { FormScheduleAttribute } from '@entities';
import { FormScheduleType } from '../enums/FormScheduleType';
import { FormSchedulePeriod } from '../enums/FormSchedulePeriod';
import { UpdateScheduleDto } from '../dtos/UpdateScheduleDto';
import { DeleteScheduleTransaction } from '../transactions/DeleteScheduleTransaction';
import { CreateScheduleTransaction } from '../transactions/CreateScheduleTransaction';
import { UpdateScheduleTransaction } from '../transactions/UpdateScheduleTransaction';

@Injectable()
export class SchedulesService {
  constructor(
    @Inject(SchedulesRepository)
    readonly schedulesRepository: SchedulesRepository,
    @Inject(CreateScheduleTransaction)
    readonly createScheduleTransaction: CreateScheduleTransaction,
    @Inject(UpdateScheduleTransaction)
    readonly updateScheduleTransaction: UpdateScheduleTransaction,
    @Inject(DeleteScheduleTransaction)
    readonly deleteScheduleTransaction: DeleteScheduleTransaction,
  ) {}

  async create(configId: string, data: AddScheduleDto) {
    const attributes = this.generateAttributes(data);
    return this.createScheduleTransaction.run({ configId, data, attributes });
  }

  async getByConfig(configId: string) {
    return this.schedulesRepository.getByConfig(configId);
  }

  async getActiveByGroup(groupId: string) {
    return this.schedulesRepository.getActiveByGroup(groupId);
  }

  async update(scheduleId: string, data: UpdateScheduleDto) {
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
  }: AddScheduleDto): Omit<FormScheduleAttribute, 'scheduleId' | 'schedule'>[] {
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
