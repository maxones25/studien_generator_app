import { Provider } from '@nestjs/common';
import { FormPagesService } from './form-pages.service';
import { FormPageGuard } from './guards/form-page.guard';
import { EntityManager } from 'typeorm';
import { FormPage } from '@entities/form-page.entity';
import { FormPagesRepository } from './form-pages.repository';

const formPagesProviders: Provider[] = [
  FormPagesService,
  {
    provide: FormPageGuard,
    useClass: FormPageGuard,
  },
  {
    provide: FormPagesRepository,
    useFactory: (entityManager) =>
      new FormPagesRepository(FormPage, entityManager),
    inject: [EntityManager],
  },
];

export default formPagesProviders;
