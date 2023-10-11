import { Director } from '@admin/directors/domain';
import { IMember, Role } from '@entities/core/study';

export class Member implements IMember {
  directorId: string;
  studyId: string;
  role: Role;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  director: Director;

  constructor(data: Partial<IMember>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
