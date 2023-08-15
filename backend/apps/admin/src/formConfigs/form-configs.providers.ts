import { Provider } from '@nestjs/common';
import { FormConfigsService } from './form-configs.service';
import { FormConfigsRepository } from './form-configs.repository';
import { FormConfiguration } from '@entities';
import { EntityManager } from 'typeorm';
import { FormConfigGuard } from './form-config.guard';

const formConfigsProviders: Provider[] = [
  FormConfigsService,
  {
    provide: FormConfigsRepository,
    useFactory: (entityManager) =>
      new FormConfigsRepository(FormConfiguration, entityManager),
    inject: [EntityManager],
  },
  {
    provide: FormConfigGuard,
    useClass: FormConfigGuard,
  },
];

export default formConfigsProviders;
