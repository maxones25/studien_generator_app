import {
  FormSchedule as FormScheduleSchema,
  FormScheduleAttribute as FormScheduleAttributeSchema,
} from '@entities/schema';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ISchedulesRepository } from '@admin/Groups/domain';
import { TypeOrmRepository } from '@shared/modules/db';
import { Schedule } from '@entities/core/group';

export class SchedulesRepository implements ISchedulesRepository {
  private readonly schedules: TypeOrmRepository<FormScheduleSchema>;
  private readonly attributes: TypeOrmRepository<FormScheduleAttributeSchema>;

  constructor(
    @InjectRepository(FormScheduleSchema)
    schedules: Repository<FormScheduleSchema>,
    @InjectRepository(FormScheduleAttributeSchema)
    attributes: Repository<FormScheduleAttributeSchema>,
  ) {
    this.schedules = new TypeOrmRepository(schedules);
    this.attributes = new TypeOrmRepository(attributes);
  }

  async addSchedule({
    configId,
    period,
    postpone,
    restrict,
    times,
    type,
    amount,
    daysOfMonth,
    daysOfWeek,
    frequency,
  }: Schedule): Promise<string> {
    const schedule = await this.schedules.create({
      configId,
      type,
      period,
      postpone,
      restrict,
      times,
    });

    const scheduleId = schedule.id;

    if (frequency !== undefined) {
      await this.attributes.create({
        scheduleId,
        key: 'frequency',
        value: frequency,
      });
    }

    if (amount !== undefined) {
      await this.attributes.create({
        scheduleId,
        key: 'amount',
        value: amount,
      });
    }

    if (daysOfMonth !== undefined) {
      await this.attributes.create({
        scheduleId,
        key: 'daysOfMonth',
        value: daysOfMonth,
      });
    }

    if (daysOfWeek !== undefined) {
      await this.attributes.create({
        scheduleId,
        key: 'daysOfWeek',
        value: daysOfWeek,
      });
    }

    return schedule.id;
  }
}
