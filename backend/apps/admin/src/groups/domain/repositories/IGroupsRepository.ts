import { Group } from '@entities/core/group';
import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';

export const GROUPS_REPOSITORY = 'GROUPS_REPOSITORY';

export interface IGroupsRepository {
  getGroupByStudy(studyId: string, id: string): Promise<Group>;
  isGroupDeleted(groupId: Id): Promise<boolean>;
  getGroupById(groupId: Id): Promise<Group>;
  getGroupsByStudy(studyId: Id, deleted: boolean): Promise<Group[]>;
  restoreGroup(groupId: Id): Promise<UpdatedResult>;
  softDeleteGroup(groupId: Id): Promise<DeletedResult>;
  hardDeleteGroup(groupId: Id): Promise<DeletedResult>;
  changeGroupName(group: Group): Promise<UpdatedResult>;
  createGroup(group: Group): Promise<Id>;
}
