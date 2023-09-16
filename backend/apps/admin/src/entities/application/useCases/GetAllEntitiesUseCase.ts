import {
  Entity,
  GetAllEntitiesUseCaseInput,
  IEntitiesRepository,
  IGetAllEntitiesUseCase,
} from '@admin/entities/domain';

export class GetAllEntitiesUseCase implements IGetAllEntitiesUseCase {

    constructor(
        private readonly entitiesRepository : IEntitiesRepository,
    ){}
  execute({ studyId }: GetAllEntitiesUseCaseInput): Promise<Entity[]> {
    return this.entitiesRepository.getAll(studyId);
  }
}
