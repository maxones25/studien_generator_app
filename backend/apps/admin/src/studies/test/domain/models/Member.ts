import { Role } from './Role';

export class Member {
  constructor(
    readonly directorId: string,
    readonly studyId: string,
    readonly role: Role,
  ) {}
}
