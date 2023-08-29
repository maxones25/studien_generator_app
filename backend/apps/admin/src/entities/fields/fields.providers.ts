import { Provider } from '@nestjs/common';
import { FieldGuard } from './field.guard';
import { FieldsService } from './fields.service';
import { FieldsRepository } from './fields.repository';
import { AddFieldTransaction } from './transactions/AddFieldTransaction';
import { UpdateFieldTransaction } from './transactions/UpdateFieldTransaction';

const entityFieldsProviders: Provider[] = [
  FieldsService,
  FieldGuard,
  FieldsRepository,
  AddFieldTransaction,
  UpdateFieldTransaction,
];

export default entityFieldsProviders;
