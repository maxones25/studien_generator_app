import {
  ChangeGroupNameUseCaseInput,
  IChangeGroupNameUseCase,
  IGroupsRepository,
} from '@admin/groups/domain';
import { Group } from '@entities/core/group';
import { UpdatedResult } from '@shared/modules/core';

export class ChangeGroupNameUseCase implements IChangeGroupNameUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}
  execute({
    groupId,
    name,
  }: ChangeGroupNameUseCaseInput): Promise<UpdatedResult> {
    const group = new Group({ id: groupId, name });
    return this.groupsRepository.changeGroupName(group);
  }
}
