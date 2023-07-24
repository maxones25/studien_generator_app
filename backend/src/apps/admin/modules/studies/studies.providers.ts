import { EntityManager } from 'typeorm';
import { StudiesRepository } from './studies.repository';
import { StudiesService } from './studies.service';
import { Study } from '@entities/study.entity';
import { Provider } from '@nestjs/common';
import { StudyGuard } from './guards/study.guard';

const studiesProviders: Provider[] = [
  StudiesService,
  {
    provide: StudiesRepository,
    useFactory: (entityManager: EntityManager) =>
      new StudiesRepository(Study, entityManager),
    inject: [EntityManager],
  },
  {
    provide: StudyGuard,
    useClass: StudyGuard,
  },
];

export default studiesProviders;
