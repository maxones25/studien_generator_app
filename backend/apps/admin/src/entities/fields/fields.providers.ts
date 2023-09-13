import { Provider } from '@nestjs/common';
import { FieldGuard } from './field.guard';
import { FieldsService } from './fields.service';
import { FieldsRepository } from './fields.repository';
import { AddFieldTransaction } from './transactions/AddFieldTransaction';
import { UpdateFieldTransaction } from './transactions/UpdateFieldTransaction';
import { AddFieldUseCase } from './useCases/AddFieldUseCase';

const entityFieldsProviders: Provider[] = [
  FieldsService,
  FieldGuard,
  FieldsRepository,
  AddFieldTransaction,
  UpdateFieldTransaction,
  {
    provide: "IFieldsRepository",
    useClass: FieldsRepository,
  },
  AddFieldUseCase,
];

export default entityFieldsProviders;
