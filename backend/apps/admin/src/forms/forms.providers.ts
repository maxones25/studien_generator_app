import { Provider } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsRepository } from './forms.repository';
import { Form } from '@entities/form.entity';
import { EntityManager } from 'typeorm';
import { FormGuard } from './guards/form.guard';
import { CreateFormTransaction } from './transactions/CreateFormTransaction';
import { QueryFormGuard } from './guards/query-form.guard';

const formsProviders: Provider[] = [
  FormsService,
  CreateFormTransaction,
  {
    provide: FormsRepository,
    useFactory: (entityManager) => new FormsRepository(Form, entityManager),
    inject: [EntityManager],
  },
  {
    provide: FormGuard,
    useClass: FormGuard,
  },
  {
    provide: QueryFormGuard,
    useClass: QueryFormGuard,
  },
];

export default formsProviders;
