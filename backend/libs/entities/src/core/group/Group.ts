import { Entity } from '@entities/modules/core/Entity';

export interface IGroup extends Entity {
  name: string;

  studyId: string;
}

export class Group implements IGroup {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  name: string;
  studyId: string;

  constructor(data: Partial<IGroup>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
