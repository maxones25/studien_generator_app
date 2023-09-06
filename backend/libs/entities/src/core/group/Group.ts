import { Entity } from '@entities/modules/core/Entity';

export interface Group extends Entity {
  name: string;

  studyId: string;
}
