import { FormConfiguration } from '@entities/form-configuration.entity';
import { Repository } from 'typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { InjectRepository } from '@nestjs/typeorm';

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
    return this.db.find({
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
        schedules: true,
      },
      select: {
        id: true,
        isActive: true,
        type: true,
        form: {
          id: true,
          name: true,
        },
      },
    });
  }
}
