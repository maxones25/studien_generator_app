import { Entity } from '@entities/modules/core';
import { FieldType } from './FieldType';

export interface IField extends Entity {
  name: string;
  type: FieldType;
}
