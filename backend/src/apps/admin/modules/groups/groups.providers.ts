import { EntityManager } from 'typeorm';
import { Provider } from '@nestjs/common';
import { Group } from '@entities/group.entity';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { GroupGuard } from './guards/group.guard';

const groupsProviders: Provider[] = [
  GroupsService,
  {
    provide: GroupsRepository,
    useFactory: (entityManager: EntityManager) =>
      new GroupsRepository(Group, entityManager),
    inject: [EntityManager],
  },
  {
    provide: GroupGuard,
    useClass: GroupGuard,
  },
];

export default groupsProviders;
