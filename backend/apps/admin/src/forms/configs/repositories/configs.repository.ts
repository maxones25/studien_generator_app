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
  async getByGroup(groupId: string) {
    return this.db.find({
      where: {
        groupId,
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
