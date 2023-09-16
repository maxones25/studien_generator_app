import {
  Director,
  IDirectorsRepository,
  IUpdateDirectorUseCase,
  UpdateDirectorInput,
} from '@admin/directors/domain';

export class UpdateDirectorUseCase implements IUpdateDirectorUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}

  execute({
    directorId,
    data: { email, firstName, lastName },
  }: UpdateDirectorInput): Promise<number> {
    const director = new Director({
      id: directorId,
      email,
      firstName,
      lastName,
    });
    return this.directorsRepository.update(director);
  }
}
