import {
  Director,
  GetDirectorByIdUseCaseInput,
  IDirectorsRepository,
  IGetDirectorByIdUseCase,
} from '@admin/directors/domain';

export class GetDirectorByIdUseCase implements IGetDirectorByIdUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}
  execute({ directorId }: GetDirectorByIdUseCaseInput): Promise<Director> {
    return this.directorsRepository.getById(directorId);
  }
}
