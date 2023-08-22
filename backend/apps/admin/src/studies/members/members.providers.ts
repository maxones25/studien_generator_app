import { Provider } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { StudyMember } from '@entities/study-member.entity';
import { EntityManager } from 'typeorm';
import { MemberGuard } from './member.guard';
import { MembersService } from './members.service';

const membersProviders: Provider[] = [
  MembersService,
  MemberGuard,
  MembersRepository,
];

export default membersProviders;
