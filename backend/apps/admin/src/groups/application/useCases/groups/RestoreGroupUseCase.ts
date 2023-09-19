import {
  IGroupsRepository,
  IRestoreGroupUseCase,
  RestoreGroupUseCaseInput,
} from '@admin/groups/domain';
import { UpdatedResult } from '@shared/modules/core';

export class RestoreGroupUseCase implements IRestoreGroupUseCase {
  constructor(private readonly groupsRepository: IGroupsRepository) {}

  execute({ groupId }: RestoreGroupUseCaseInput): Promise<UpdatedResult> {
    return this.groupsRepository.restoreGroup(groupId);
  }
}
