import { Provider } from '@nestjs/common';
import { FieldGuard } from './field.guard';
import { FieldsService } from './fields.service';
import { FieldsRepository } from './fields.repository';

const entityFieldsProviders: Provider[] = [
  FieldsService,
  FieldGuard,
  FieldsRepository,
];

export default entityFieldsProviders;
