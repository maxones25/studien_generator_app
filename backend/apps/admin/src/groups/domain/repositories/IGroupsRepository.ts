import { Group } from '@entities/core/group';
import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';

export const GROUPS_REPOSITORY = 'GROUPS_REPOSITORY';

export interface IGroupsRepository {
  softDeleteGroup(groupId: Id): Promise<DeletedResult>;
  hardDeleteGroup(groupId: Id): Promise<DeletedResult>;
  changeGroupName(group: Group): Promise<UpdatedResult>;
  createGroup(group: Group): Promise<Id>;
}
