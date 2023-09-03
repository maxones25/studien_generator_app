import { StudyMember } from '@entities';
import { Director } from '@entities';
import { InjectRepository } from '@nestjs/typeorm';
import { RecordRepository } from '@shared/modules/records/record.repository';
import { IsNull, Not, Repository } from 'typeorm';

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

  async getByEmail(email: string, deleted = false) {
    const deletedAt = deleted ? undefined : IsNull();
    return this.db.findOne({
      where: {
        email,
        deletedAt,
      },
      select: {
        id: true,
        password: true,
      },
    });
  }

  get() {
    return this.db.find({
      select: {
        id: true,
        deletedAt: true,
        createdAt: true,
        modifiedAt: true,
        email: true,
        firstName: true,
        lastName: true,
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

  changePassword(id: string, password: string) {
    return this.update(id, { password });
  }
}
