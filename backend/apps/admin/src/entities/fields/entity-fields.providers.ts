import { Provider } from '@nestjs/common';
import { EntityFieldsService } from './entity-fields.service';
import { EntityFieldGuard } from './guards/entity-field.guard';
import { EntityGuard } from '../entity.guard';

const entityFieldsProviders: Provider[] = [
  EntityFieldsService,
  {
    provide: EntityFieldGuard,
    useClass: EntityFieldGuard,
  },
];

export default entityFieldsProviders;
