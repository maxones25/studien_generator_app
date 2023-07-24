import { Provider } from '@nestjs/common';
import { StudyMembersService } from './study-members.service';
import { StudyMembersRepository } from './study-members.repository';
import { StudyMember } from '../../../entities/study-member.entity';
import { EntityManager } from 'typeorm';
import { StudyMemberGuard } from './guards/study-member.guard';

const studyMembersProviders: Provider[] = [
  StudyMembersService,
  {
    provide: StudyMembersRepository,
    useFactory: (entityManager: EntityManager) =>
      new StudyMembersRepository(StudyMember, entityManager),
    inject: [EntityManager],
  },
  {
    provide: StudyMemberGuard,
    useClass: StudyMemberGuard,
  },
];

export default studyMembersProviders;
