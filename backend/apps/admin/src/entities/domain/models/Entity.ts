import { IEntity } from '@entities/core/entity';

export class Entity implements IEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly deletedAt: Date;
  readonly name: string;
  readonly studyId: string;

  constructor(data: Partial<IEntity>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
