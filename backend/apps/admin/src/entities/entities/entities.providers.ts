import { Provider } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesRepository } from './repositories/entities.repository';
import { EntityGuard } from './guards/entity.guard';
import { CreateEntityUseCase } from './useCases/CreateEntityUseCase';
import { ChangeNameUseCase } from './useCases/ChangeNameUseCase';

const entitiesProviders: Provider[] = [
  EntityGuard,
  EntitiesService,
  EntitiesRepository,
  {
    provide: 'IEntitiesRepository',
    useClass: EntitiesRepository,
  },
  CreateEntityUseCase,
  ChangeNameUseCase,
];

export default entitiesProviders;
