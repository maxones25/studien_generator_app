import { Group } from '@entities/core/group';
import { Id } from '@shared/modules/core';

export const GROUPS_REPOSITORY = 'GROUPS_REPOSITORY';

export interface IGroupsRepository {
  createGroup(data: Group): Promise<Id>;
}
