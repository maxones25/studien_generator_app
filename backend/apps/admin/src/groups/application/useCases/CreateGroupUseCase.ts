import {
  CreateGroupUseCaseInput,
  ICreateGroupUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';
import { Id } from '@shared/modules/core';

export class CreateGroupUseCase implements ICreateGroupUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({ data }: CreateGroupUseCaseInput): Promise<Id> {
    const group = new Group(data);
    return this.groupsRepository.createGroup(group);
  }
}
