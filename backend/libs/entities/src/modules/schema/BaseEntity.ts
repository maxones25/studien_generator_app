import { Column, ObjectLiteral } from 'typeorm';
import { ValueObject } from '../core/ValueObject';

export abstract class BaseEntity implements ObjectLiteral, ValueObject {
  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  deletedAt: Date;

  get isDeleted() {
    return this.deletedAt !== null;
  }
}
