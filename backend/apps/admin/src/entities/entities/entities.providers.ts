import { Provider } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesRepository } from './entities.repository';
import { EntityGuard } from './entity.guard';
import { CreateEntityUseCase } from './useCases/CreateEntityUseCase';

const entitiesProviders: Provider[] = [
  EntityGuard,
  EntitiesService,
  EntitiesRepository,
  {
    provide: 'IEntitiesRepository',
    useClass: EntitiesRepository,
  },
  CreateEntityUseCase,
];

export default entitiesProviders;
