import { UpdateDirectorUseCase } from '@admin/directors/application';
import {
  DIRECTORS_REPOSITORY,
  UPDATE_DIRECTOR_USE_CASE,
  IDirectorsRepository,
} from '@admin/directors/domain';
import { Provider } from '@nestjs/common';

export const UpdateDirectorProvider: Provider = {
  provide: UPDATE_DIRECTOR_USE_CASE,
  useFactory(directorsRepository: IDirectorsRepository) {
    return new UpdateDirectorUseCase(directorsRepository);
  },
  inject: [DIRECTORS_REPOSITORY],
};
