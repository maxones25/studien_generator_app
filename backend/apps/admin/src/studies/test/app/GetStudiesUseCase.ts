import { Study } from '../domain/models/Study';
import { IStudiesRepository } from '../domain/repositories/IStudiesRepository';
import { IGetStudiesUseCase } from '../domain/useCases/IGetStudiesUseCase';

export class GetStudiesUseCase implements IGetStudiesUseCase {

    constructor(
        private readonly studiesRepository: IStudiesRepository,
    ){}
  execute(): Promise<Study[]> {
    return this.studiesRepository.getStudies()
  }
}
