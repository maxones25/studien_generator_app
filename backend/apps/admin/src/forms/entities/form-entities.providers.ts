import { Provider } from '@nestjs/common';
import { FormEntitiesRepository } from './form-entities.repository';
import { Entity, EntityManager } from 'typeorm';
import { FormEntity } from '@entities/form-entity.entity';
import { FormEntitiesService } from './form-entities.service';

const formEntitiesProviders: Provider[] = [
  FormEntitiesService,
  {
    provide: FormEntitiesRepository,
    useFactory: (entityManager) =>
      new FormEntitiesRepository(FormEntity, entityManager),
    inject: [EntityManager],
  },
];

export default formEntitiesProviders;
