import { StudyMember } from '@entities';
import { Director } from '@entities/director.entity';
import { Repository } from 'typeorm';

export class DirectorsRepository extends Repository<Director> {
  async getByEmail(email: string) {
    return this.findOne({
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
    return this.find({
      where: {
        studies: {
          studyId
        }
      },
      select: { id: true, firstName: true, lastName: true, email: true },
    });
  }

  async getNonStudyMembers(studyId: string) {
    return this.createQueryBuilder('d')
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
