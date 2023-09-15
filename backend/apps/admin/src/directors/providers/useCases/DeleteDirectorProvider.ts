import { DeleteDirectorUseCase } from '@admin/directors/application';
import {
  DELETE_DIRECTOR_USE_CASE,
  DIRECTORS_REPOSITORY,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const DeleteDirectorProvider: Provider = {
  provide: DELETE_DIRECTOR_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new DeleteDirectorUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
