import { Provider } from '@nestjs/common';
import { FormPagesService } from './form-pages.service';
import { FormPageGuard } from './guards/form-page.guard';
import { EntityManager } from 'typeorm';
import { FormPage } from '@entities/form-page.entity';
import { FormPagesRepository } from './form-pages.repository';
import { FormGuard } from '../form.guard';

const formPagesProviders: Provider[] = [
  FormPagesService,
  FormGuard,
  {
    provide: FormPagesRepository,
    useFactory: (entityManager) =>
      new FormPagesRepository(FormPage, entityManager),
    inject: [EntityManager],
  },
  {
    provide: FormPageGuard,
    useClass: FormPageGuard,
  },
];

export default formPagesProviders;
