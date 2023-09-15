import { RestoreDirectorUseCase } from '@admin/directors/application';
import {
  RESTORE_DIRECTOR_USE_CASE,
  IDirectorsRepository,
  DIRECTORS_REPOSITORY,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const RestoreDirectorProvider: Provider = {
  provide: RESTORE_DIRECTOR_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new RestoreDirectorUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
