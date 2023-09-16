import {
  CreateEntityUseCaseInput,
  Entity,
  ICreateEntityUseCase,
  IEntitiesRepository,
} from '@admin/entities/domain';

export class CreateEntityUseCase implements ICreateEntityUseCase {
  constructor(
    private readonly entitiesRepository: IEntitiesRepository,
  ){}

  execute({ studyId, data: { name } }: CreateEntityUseCaseInput): Promise<string> {

    const entity = new Entity({ name, studyId });

    return this.entitiesRepository.createEntity(entity)
  }
}
