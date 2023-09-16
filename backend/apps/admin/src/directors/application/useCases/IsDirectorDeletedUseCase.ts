import {
  IDirectorsRepository,
  IIsDirectorDeletedUseCase,
  IsDirectorDeletedUseCaseInput,
} from '@admin/directors/domain';

export class IsDirectorDeletedUseCase implements IIsDirectorDeletedUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}

  execute({ directorId }: IsDirectorDeletedUseCaseInput): Promise<boolean> {
    return this.directorsRepository.isDeleted(directorId);
  }
}
