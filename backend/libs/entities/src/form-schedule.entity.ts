import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Task } from '.';
import { FormConfiguration } from '.';
import { FormScheduleType } from '@admin/groups/schedules/enums/FormScheduleType';
import { FormSchedulePeriod } from '@admin/groups/schedules/enums/FormSchedulePeriod';
import { FormScheduleAttribute } from './form-schedule-attribute.entity';

export type Postpone = {
  times: number;
  duration: number;
};

@TypeOrmEntity()
export class FormSchedule {
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
