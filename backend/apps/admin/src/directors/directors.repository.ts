import { StudyMember } from '@entities';
import { Director } from '@entities/director.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { Repository } from 'typeorm';

export class DirectorsRepository extends RecordRepository<Director> {
  constructor(
    @InjectRepository(Director)
    db: Repository<Director>,
  ) {
    super(db);
  }

  async getById(id: string) {
    return await this.db.findOne({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.db.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async getStudyMembers(studyId: string) {
    return this.db.find({
      where: {
        studies: {
          studyId,
        },
      },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

  async getNonStudyMembers(studyId: string) {
    return this.db
      .createQueryBuilder('d')
      .select(['d.id', 'd.firstName', 'd.lastName', 'd.email'])
      .leftJoin(
        StudyMember,
        'sm',
        'd.id = sm.directorId AND sm.studyId = :studyId',
        { studyId },
      )
      .where('sm.studyId IS NULL')
      .groupBy('d.id')
      .getMany();
  }
}
