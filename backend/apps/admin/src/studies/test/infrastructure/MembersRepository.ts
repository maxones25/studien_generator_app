import { TypeOrmRepository } from '@admin/studies/shared/TypeOrmRepo';
import { IMembersRepository } from '../domain/repositories/IMemberRepository';
import { BaseStudyMember, StudyMember } from '@entities';
import { Role } from '../domain/models/Role';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

export class MembersRepository
  extends TypeOrmRepository<BaseStudyMember, StudyMember>
  implements IMembersRepository
{
  constructor(@InjectEntityManager() em: EntityManager) {
    super(StudyMember, em);
  }

  async addMember(
    studyId: string,
    directorId: string,
    role: Role,
  ): Promise<void> {
    await this.create({ directorId, role, studyId });
  }
}
