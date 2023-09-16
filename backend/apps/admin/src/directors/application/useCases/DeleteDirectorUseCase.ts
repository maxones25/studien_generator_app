import {
  DeleteDirectorInput,
  IDeleteDirectorUseCase,
  IDirectorsRepository,
} from '@admin/directors/domain';

export class DeleteDirectorUseCase implements IDeleteDirectorUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}

  execute({ directorId, hardDelete }: DeleteDirectorInput): Promise<number> {
    if (hardDelete) {
      return this.directorsRepository.hardDeleteDirector(directorId);
    } else {
      return this.directorsRepository.softDeleteDirector(directorId);
    }
  }
}
