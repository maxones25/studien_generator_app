import { IsDirectorDeletedUseCase } from '@admin/directors/application';
import {
  DIRECTORS_REPOSITORY,
  IS_DIRECTOR_DELETED_USE_CASE,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const IsDirectorDeletedUseCaseProvider: Provider = {
  provide: IS_DIRECTOR_DELETED_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new IsDirectorDeletedUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
