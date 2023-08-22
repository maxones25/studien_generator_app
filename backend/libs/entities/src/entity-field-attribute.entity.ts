import {
  Entity as TypeOrmEntity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { EntityField } from '.';
import { AttributeKey } from '@shared/modules/records/attribute.repository';

export type EntityFieldAttributes = {
  values?: string[];
};

@TypeOrmEntity()
export class EntityFieldAttribute {
  @PrimaryColumn()
  fieldId: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    transformer: {
      from(value) {
        return value as AttributeKey<EntityFieldAttributes>;
      },
      to(value) {
        return value;
      },
    },
  })
  key: AttributeKey<EntityFieldAttributes>;

  @Column({
    type: 'json',
    transformer: {
      from(value) {
        return value;
      },
      to(value) {
        return JSON.stringify(value)
      },
    },
  })
  value: any;

  @ManyToOne(() => EntityField, (field) => field.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  field: EntityField;
}
