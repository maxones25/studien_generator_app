import { Entity } from '@entities/modules/core';

export interface IForm extends Entity {
  name: string;
}

export class Form implements IForm {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  name: string;

  constructor(data: Partial<IForm>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
