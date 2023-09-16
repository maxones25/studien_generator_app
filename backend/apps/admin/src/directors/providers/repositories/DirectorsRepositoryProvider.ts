import { Provider } from '@nestjs/common';
import { DIRECTORS_REPOSITORY } from '@admin/directors/domain';
import { DirectorsRepository } from '@admin/directors/infrastructure/db';

export const DirectorsRepositoryProvider: Provider = {
  provide: DIRECTORS_REPOSITORY,
  useClass: DirectorsRepository,
};
