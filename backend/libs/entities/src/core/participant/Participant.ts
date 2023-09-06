import { Entity } from '@entities/modules/core/Entity';

export interface Participant extends Entity {
  number: string;

  password: string;

  groupId: string;

  studyId: string;

  subscription: string;
}
