import { Provider } from '@nestjs/common';
import { FormConfigurationsService } from './form-configurations.service';
import { FormConfigurationsRepository } from './form-configurations.repository';
import { EntityManager } from 'typeorm';
import { FormConfiguration } from '@entities/form-configuration.entity';

const formConfigurationsProviders: Provider[] = [
  FormConfigurationsService,
  {
    provide: FormConfigurationsRepository,
    useFactory: (entityManager) =>
      new FormConfigurationsRepository(FormConfiguration, entityManager),
    inject: [EntityManager],
  },
];

export default formConfigurationsProviders;
