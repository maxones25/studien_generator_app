import { Provider } from '@nestjs/common';
import { FormConfigurationsService } from './form-configurations.service';
import { FormConfigurationsRepository } from './form-configurations.repository';
import { EntityManager } from 'typeorm';
import { FormConfiguration } from '@entities/form-configuration.entity';
import { UpdateFormConfigTransaction } from './transactions/UpdateFormConfigTransaction';

const formConfigurationsProviders: Provider[] = [
  FormConfigurationsService,
  UpdateFormConfigTransaction,
  {
    provide: FormConfigurationsRepository,
    useFactory: (entityManager) =>
      new FormConfigurationsRepository(FormConfiguration, entityManager),
    inject: [EntityManager],
  },
];

export default formConfigurationsProviders;
