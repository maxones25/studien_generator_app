import { ValueObject } from '@entities/modules/core/ValueObject';
import { Role } from './Role';

export interface Member extends ValueObject {
  directorId: string;
  studyId: string;
  role: Role;
}
