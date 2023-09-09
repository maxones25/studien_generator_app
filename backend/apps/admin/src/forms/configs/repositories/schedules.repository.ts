import {
  FormSchedule as FormScheduleEntity,
  FormScheduleAttributes,
} from '@entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export type FormSchedule = FormScheduleEntity & FormScheduleAttributes;

@Injectable()
export class SchedulesRepository extends RecordRepository<FormScheduleEntity> {
  constructor(
    @InjectRepository(FormScheduleEntity)
    db: Repository<FormScheduleEntity>,
  ) {
    super(db);
  }

  async getByConfig(configId: string): Promise<FormSchedule[]> {
    const schedules = await this.db.find({
      where: { configId },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        attributes: true,
      },
      select: {
        id: true,
        type: true,
        period: true,
        times: true,
        configId: true,
        postpone: {
          duration: true,
          times: true,
        },
      },
    });

    return schedules.map((schedule) => ({
      ...schedule,
      isDeleted: schedule.deletedAt !== null,
      ...schedule.attributes.reduce<FormScheduleAttributes>(
        (obj, attribute) => {
          obj[attribute.key] = attribute.value;
          return obj;
        },
        {},
      ),
    }));
  }

  async getActiveByGroup(groupId: string): Promise<FormSchedule[]> {
    const schedules = await this.db.find({
      where: {
        config: {
          groupId,
          isActive: true,
        },
      },
      relations: {
        config: true,
        attributes: true,
      },
      select: {
        id: true,
        type: true,
        period: true,
        times: true,
        postpone: {
          duration: true,
          times: true,
        },
        config: {
          formId: true,
        },
        attributes: {
          key: true,
          value: true,
        },
      },
    });

    return schedules.map((schedule) => ({
      ...schedule,
      isDeleted: schedule.deletedAt !== null,
      ...schedule.attributes.reduce<FormScheduleAttributes>(
        (obj, attribute) => {
          obj[attribute.key] = attribute.value;
          return obj;
        },
        {},
      ),
    }));
  }
}
