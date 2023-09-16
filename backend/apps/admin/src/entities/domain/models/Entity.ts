import { IEntity } from '@entities/core/entity';
import { Field } from '@admin/entities/domain';

export class Entity implements IEntity {
  readonly id: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
  readonly deletedAt: Date;
  readonly name: string;
  readonly studyId: string;
  readonly fields: Field[];

  constructor(data: Partial<IEntity>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
  }
}
