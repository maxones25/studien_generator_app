import { FormSchedule as FormScheduleEntity } from '@entities';
import { FormScheduleAttributes } from '@entities/core/group';
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

  getStudyRelated(studyId: string, id: string) {
    return this.db.findOneBy({ config: { studyId }, id });
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
