import { Provider } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsRepository } from './directors.repository';
import { EntityManager } from 'typeorm';
import { Director } from '@entities/director.entity';
import { DirectorGuard } from './director.guard';

const directorsProviders: Provider[] = [
  DirectorsService,
  DirectorGuard,
  {
    provide: DirectorsRepository,
    useFactory: (entityManager) =>
      new DirectorsRepository(Director, entityManager),
    inject: [EntityManager],
  },
];

export default directorsProviders;
