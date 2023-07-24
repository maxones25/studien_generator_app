import { Provider } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesRepository } from './entities.repository';
import { Entity } from '../../entities/entity.entity';
import { EntityManager } from 'typeorm';
import { EntityGuard } from './guards/entity.guard';

const entitiesProviders: Provider[] = [
  EntitiesService,
  {
    provide: EntitiesRepository,
    useFactory: (entityManager) =>
      new EntitiesRepository(Entity, entityManager),
    inject: [EntityManager],
  },
  {
    provide: EntityGuard,
    useClass: EntityGuard
  }
];

export default entitiesProviders;
