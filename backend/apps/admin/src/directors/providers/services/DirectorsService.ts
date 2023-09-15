import { DirectorsService } from '@admin/directors/application';
import {
  DIRECTORS_REPOSITORY,
  DIRECTORS_SERVICE,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const DirectorsServiceProvider: Provider = {
  provide: DIRECTORS_SERVICE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new DirectorsService(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
