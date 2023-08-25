import { Provider } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { GroupGuard } from './guards/group.guard';

const groupsProviders: Provider[] = [
  GroupsService,
  GroupsRepository,
  GroupGuard,
];

export default groupsProviders;
