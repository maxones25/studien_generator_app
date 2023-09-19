import {
  CreateGroupUseCaseInput,
  ICreateGroupUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Id } from '@shared/modules/core';

export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({ data }: CreateGroupUseCaseInput): Promise<Id> {
    return this.groupsRepository.createGroup(data);
  }
}
