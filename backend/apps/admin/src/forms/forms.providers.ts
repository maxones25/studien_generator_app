import { Provider } from '@nestjs/common';
import { FormsService } from './forms.service';
import { FormsRepository } from './forms.repository';
import { Form } from '@entities/form.entity';
import { EntityManager } from 'typeorm';
import { FormGuard } from './form.guard';
import { CreateFormTransaction } from './transactions/CreateFormTransaction';

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
];

export default formsProviders;
