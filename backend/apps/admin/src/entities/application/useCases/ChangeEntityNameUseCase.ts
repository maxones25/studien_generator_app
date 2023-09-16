import {
  ChangeEntityNameInput,
  Entity,
  IChangeEntityNameUseCase,
  IEntitiesRepository,
  NameAlreadyExistsError,
} from '@admin/entities/domain';
import { UpdatedResult } from '@shared/modules/core';

export class ChangeEntityNameUseCase implements IChangeEntityNameUseCase {
  constructor(private readonly entitiesRepository: IEntitiesRepository) {}

  async execute({ studyId, entityId, name }: ChangeEntityNameInput): Promise<UpdatedResult> {
    const nameExists = await this.entitiesRepository.existsEntityName(studyId, name);

    if(nameExists) throw new NameAlreadyExistsError();

    const entity = new Entity({ id: entityId, name });
    return this.entitiesRepository.updateEntity(entity);
  }
}
