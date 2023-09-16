import { Entity as BaseEntity } from '@entities/modules/core';
import { IField } from './Field';

export interface IEntity extends BaseEntity {
  name: string;
  studyId: string;
  fields: IField[];
}
