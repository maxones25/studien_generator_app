import { Entity as TypeOrmEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { FormConfiguration, FormScheduleAttribute, Task } from '..';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import {
  FormSchedulePeriod,
  FormScheduleType,
  ISchedule,
  Postpone,
  Restrict,
} from '@entities/core/group';

@TypeOrmEntity()
export class FormSchedule extends IdEntity implements ISchedule {
  @Column()
  configId: string;

  @Column({
    type: 'enum',
    enum: FormScheduleType,
  })
  type: FormScheduleType;

  @Column({
    type: 'enum',
    enum: FormSchedulePeriod,
  })
  period: FormSchedulePeriod;

  @Column({
    type: 'json',
    transformer: {
      from(value: string[]) {
        return value;
      },
      to(value: string[]) {
        return JSON.stringify(value);
      },
    },
  })
  times: string[];

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      from(value: Postpone) {
        return value;
      },
      to(value: Postpone) {
        return JSON.stringify(value);
      },
    },
  })
  postpone: Postpone;

  @Column({
    type: 'json',
    nullable: true,
    transformer: {
      from(value: Restrict) {
        return value;
      },
      to(value: Restrict) {
        return JSON.stringify(value);
      },
    },
  })
  restrict: Restrict;

  @OneToMany(() => Task, (task) => task.form)
  tasks: Task[];

  @OneToMany(() => FormScheduleAttribute, (attribute) => attribute.schedule)
  attributes: FormScheduleAttribute[];

  @ManyToOne(() => FormConfiguration, (form) => form.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  config: FormConfiguration;
}
