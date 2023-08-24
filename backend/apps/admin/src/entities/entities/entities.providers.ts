import { Provider } from '@nestjs/common';
import { EntitiesService } from './entities.service';
import { EntitiesRepository } from './entities.repository';
import { EntityGuard } from './entity.guard';

const entitiesProviders: Provider[] = [
  EntitiesService,
  EntitiesRepository,
  EntityGuard,
];

export default entitiesProviders;
