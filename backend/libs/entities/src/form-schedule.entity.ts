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

  @Column('integer', { nullable: true })
  frequency: number;

  @Column({
    type: 'json',
    transformer: {
      from(value: string[]) {
        return value;
      },
      to(value: string[]) {
        console.log('to', value);
        return JSON.stringify(value);
      },
    },
  })
  times: string[];

  @Column('json')
  data: any;

  @OneToMany(() => Task, (task) => task.form)
  tasks: Task[];

  @ManyToOne(() => FormConfiguration, (form) => form.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  config: FormConfiguration;
}
