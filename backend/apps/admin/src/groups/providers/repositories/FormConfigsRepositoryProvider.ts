import { FORM_CONFIGS_REPOSITORY } from '@admin/groups/domain';
import { FormConfigsRepository } from '@admin/groups/infrastructure/db';
import { Provider } from '@nestjs/common';

export const FormConfigsRepositoryProvider: Provider = {
  provide: FORM_CONFIGS_REPOSITORY,
  useClass: FormConfigsRepository,
};
