import { ValueObject } from '@entities/modules/core/ValueObject';

export interface StudyAttribute extends ValueObject {
  studyId: string;
  key: string;
  value: any;
}
