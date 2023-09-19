import { GroupAppointment } from '@entities/core/appointment';
import { FormConfig, FormConfigType, Group } from '@entities/core/group';
import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';

export const GROUPS_REPOSITORY = 'GROUPS_REPOSITORY';

export interface IGroupsRepository {
  setFormConfigType(
    formConfigId: Id,
    TimeDependent: FormConfigType,
  ): Promise<UpdatedResult>;
  getFormConfigById(formConfigId: Id): Promise<FormConfig>;
  deactivateFormConfig(formConfigId: Id): Promise<UpdatedResult>;
  activateFormConfig(formConfigId: Id): Promise<UpdatedResult>;
  createFormConfig(formConfig: FormConfig): Promise<Id>;
  deleteFormConfig(formConfigId: Id): Promise<DeletedResult>;
  getFormConfigs(groupId: string, formId: string): Promise<FormConfig[]>;
  getGroupAppointments(
    studyId: string,
    groupId: string,
  ): Promise<GroupAppointment[]>;
  createGroupAppointment(appointment: GroupAppointment): Promise<Id>;
  getGroupByStudy(studyId: Id, id: Id): Promise<Group>;
  isGroupDeleted(groupId: Id): Promise<boolean>;
  getGroupById(groupId: Id): Promise<Group>;
  getGroupsByStudy(studyId: Id, deleted: boolean): Promise<Group[]>;
  restoreGroup(groupId: Id): Promise<UpdatedResult>;
  softDeleteGroup(groupId: Id): Promise<DeletedResult>;
  hardDeleteGroup(groupId: Id): Promise<DeletedResult>;
  changeGroupName(group: Group): Promise<UpdatedResult>;
  createGroup(group: Group): Promise<Id>;
}
