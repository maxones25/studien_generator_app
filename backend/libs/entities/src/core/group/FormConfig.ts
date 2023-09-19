import { FormConfigType } from './FormConfigType';
import { Entity } from '@entities/modules/core/Entity';

export interface IFormConfig extends Entity {
  formId: string;
  studyId: string;
  groupId: string;
  isActive: boolean;
  type: FormConfigType;
}

export class FormConfig implements IFormConfig {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  formId: string;
  studyId: string;
  groupId: string;
  isActive: boolean;
  type: FormConfigType;

  constructor(data: Partial<IFormConfig>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
