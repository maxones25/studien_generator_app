import { EntityManager } from 'typeorm';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { Group } from '../../entities/group.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { Provider } from '@nestjs/common';
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
