import { Provider } from '@nestjs/common';
import { MembersRepository } from './members.repository';
import { MemberGuard } from './member.guard';
import { MembersService } from './members.service';

const membersProviders: Provider[] = [
  MembersService,
  MemberGuard,
  MembersRepository,
];

export default membersProviders;
