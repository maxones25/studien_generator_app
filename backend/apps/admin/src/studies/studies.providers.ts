import { EntityManager } from 'typeorm';
import { StudiesService } from './studies.service';
import { Study } from '@entities/study.entity';
import { Provider } from '@nestjs/common';
import { StudyGuard } from './guards/study.guard';
import { CreateStudyTransaction } from './transactions/create-study.transaction';
import { StudyAttributesRepository } from './repositories/study-attributes.repository';
import { StudyAttribute } from '@entities';
import { StudiesRepository } from './repositories/studies.repository';
import { IsStudyActiveGuard } from './guards/IsStudyActiveGuard';

const studiesProviders: Provider[] = [
  StudiesService,
  CreateStudyTransaction,
  StudyGuard,
  IsStudyActiveGuard,
  {
    provide: StudiesRepository,
    useFactory: (entityManager: EntityManager) =>
      new StudiesRepository(Study, entityManager),
    inject: [EntityManager],
  },
  {
    provide: StudyAttributesRepository,
    useFactory: (entityManager: EntityManager) =>
      new StudyAttributesRepository(StudyAttribute, entityManager),
    inject: [EntityManager],
  },
];

export default studiesProviders;
