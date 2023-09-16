import { DeletedResult, Id, UpdatedResult } from '@shared/modules/core';
import { Member } from '../models/Member';

export const MEMBERS_REPOSITORY = 'MEMBERS_REPOSITORY';

export interface IMembersRepository {
  isMemberLastAdmin(studyId: string, directorId: string): unknown;
  getMemberByStudy(studyId: string, directorId: string): Promise<Member>;
  getMembersByStudy(studyId: string): Promise<Member[]>;
  removeMember(studyId: Id, directorId: Id): Promise<DeletedResult>;
  changeMemberRole(member: Member): Promise<UpdatedResult>;
  addMember(member: Member): Promise<void>;
}
