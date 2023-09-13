import { Provider } from '@nestjs/common';
import { FieldGuard } from './guards/field.guard';
import { FieldsService } from './fields.service';
import { FieldsRepository } from './repositories/fields.repository';
import { AddFieldUseCase } from './useCases/AddFieldUseCase';
import { UpdateFieldUseCase } from './useCases/UpdateFieldUseCase';
import { RemoveFieldUseCase } from './useCases/RemoveFieldUseCase';

const entityFieldsProviders: Provider[] = [
  FieldsService,
  FieldGuard,
  FieldsRepository,
  {
    provide: 'IFieldsRepository',
    useClass: FieldsRepository,
  },
  AddFieldUseCase,
  UpdateFieldUseCase,
  RemoveFieldUseCase,
];

export default entityFieldsProviders;
