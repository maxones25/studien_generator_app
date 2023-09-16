import { IDirectorsRepository } from '@admin/directors/domain';
import {
  IRestoreDirectorUseCase,
  RestoreDirectorInput,
} from '@admin/directors/domain';

export class RestoreDirectorUseCase implements IRestoreDirectorUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}

  execute({ directorId }: RestoreDirectorInput): Promise<number> {
    return this.directorsRepository.restore(directorId);
  }
}
