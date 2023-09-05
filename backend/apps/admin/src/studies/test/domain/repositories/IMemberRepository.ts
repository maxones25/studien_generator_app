import { Role } from '../models/Role';

export interface IMembersRepository {
  addMember(studyId: string, directorId: string, role: Role): Promise<void>;
}
