import { Provider } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { GroupGuard } from './guards/group.guard';
import { IsGroupDeletedGuard } from './guards/IsGroupDeletedGuard';
import { DeleteGroupTransaction } from './transactions/DeleteGroupTransaction';

const groupsProviders: Provider[] = [
  GroupGuard,
  IsGroupDeletedGuard,
  GroupsService,
  GroupsRepository,
  DeleteGroupTransaction,
];

export default groupsProviders;
