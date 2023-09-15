import {
    IDirectorsRepository,
  IUpdateDirectorUseCase,
  UpdateDirectorInput,
} from '@admin/directors/domain';

export class UpdateDirectorUseCase implements IUpdateDirectorUseCase {

    constructor(
        private readonly directorsRepository: IDirectorsRepository,
    ){}

  execute({ directorId, data }: UpdateDirectorInput): Promise<number> {
    return this.directorsRepository.update(directorId, data);
  }
}
