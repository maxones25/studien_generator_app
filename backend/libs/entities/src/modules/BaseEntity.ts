import { Column, ObjectLiteral } from 'typeorm';

export abstract class BaseEntity implements ObjectLiteral {
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
