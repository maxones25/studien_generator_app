import { FormConfiguration } from '@entities/form-configuration.entity';
import { Repository } from 'typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { FormScheduleAttributes } from '@entities';

export class ConfigsRepository extends RecordRepository<FormConfiguration> {
  constructor(
    @InjectRepository(FormConfiguration)
    db: Repository<FormConfiguration>,
  ) {
    super(db);
  }

  getRelatedByStudy(studyId: any, id: string): Promise<any> {
    return this.db.findOne({ where: { id, studyId } });
  }

  getByGroupAndForm(groupId: string, formId: string) {
    return this.db.find({ where: { formId, groupId } });
  }

  async getByGroup(groupId: string) {
    const configs = await this.db.find({
      where: {
        groupId,
      },
      order: {
        form: {
          name: 'DESC',
        },
        type: 'DESC',
      },
      relations: {
        form: true,
        schedules: {
          attributes: true,
        },
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        form: {
          id: true,
          name: true,
        },
        schedules: {
          id: true,
          type: true,
          period: true,
          postpone: {
            duration: true,
            times: true,
          },
          times: true,
          attributes: {
            key: true,
            value: true,
          },
        },
      },
    });

    return configs.map((config) => ({
      ...config,
      schedules: config.schedules.map(({ attributes, ...schedule }) => ({
        ...schedule,
        ...attributes.reduce<FormScheduleAttributes>((obj, attribute) => {
          const { key, value } = attribute;
          obj[key] = value;
          return obj;
        }, {}),
      })),
    }));
  }
}
