import { EntityManager } from 'typeorm';
import { StudiesRepository } from './studies.repository';
import { StudiesService } from './studies.service';
import { Study } from '../../entities/study.entity';
import { Provider } from '@nestjs/common';

const studiesProviders: Provider[] = [
  StudiesService,
  {
    provide: StudiesRepository,
    useFactory: (entityManager: EntityManager) =>
      new StudiesRepository(Study, entityManager),
    inject: [EntityManager],
  },
];

export default studiesProviders;
