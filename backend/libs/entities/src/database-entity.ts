import { Column, Entity, PrimaryGeneratedColumn, ObjectLiteral } from 'typeorm';

@Entity()
export class DatabaseEntity implements ObjectLiteral {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
