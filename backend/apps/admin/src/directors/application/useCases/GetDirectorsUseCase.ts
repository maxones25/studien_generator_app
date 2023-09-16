import {
  IDirectorsRepository,
  IGetDirectorsUseCase,
} from '@admin/directors/domain';

export class GetDirectorsUseCase implements IGetDirectorsUseCase {
  constructor(private readonly directorsRepository: IDirectorsRepository) {}
  execute(): Promise<any> {
    return this.directorsRepository.getAll();
  }
}
