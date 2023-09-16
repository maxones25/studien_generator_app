import { Entity as BaseEntity } from '@entities/modules/core';

export interface IEntity extends BaseEntity {
  name: string;
  studyId: string;
}
