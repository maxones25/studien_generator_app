import { Provider } from '@nestjs/common';
import { FieldGuard } from './field.guard';
import { FieldsService } from './fields.service';
import { FieldsRepository } from './fields.repository';
import { UpdateFieldTransaction } from './transactions/UpdateFieldTransaction';
import { AddFieldUseCase } from './useCases/AddFieldUseCase';
import { UpdateFieldUseCase } from './useCases/UpdateFieldUseCase';

const entityFieldsProviders: Provider[] = [
  FieldsService,
  FieldGuard,
  FieldsRepository,
  UpdateFieldTransaction,
  {
    provide: 'IFieldsRepository',
    useClass: FieldsRepository,
  },
  AddFieldUseCase,
  UpdateFieldUseCase,
];

export default entityFieldsProviders;
