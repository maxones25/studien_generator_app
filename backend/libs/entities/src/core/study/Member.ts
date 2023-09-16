import { ValueObject } from '@entities/modules/core/ValueObject';
import { Role } from './Role';
import { IDirector } from '../director';

export interface IMember extends ValueObject {
  directorId: string;
  studyId: string;
  role: Role;
  director: IDirector;
}
