import {
  Entity as TypeOrmEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Group } from './group.entity';
import { Study } from './study.entity';
import { Task } from './task.entity';
import { Form } from './form.entity';
import { FormConfigType } from '@shared/enums/form-config-type.enum';
import { FormConfiguration } from './form-configuration.entity';

enum ScheduleType {
  Flexible = "Flexible",
  Fix = "Fix",
}

enum SchedulePeriod {
  Day = "Day",
  Week = "Week",
  Month = "Month",
}

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
    enum: ScheduleType,
  })
  type: ScheduleType;

  @Column({
    type: 'enum',
    enum: SchedulePeriod,
  })
  period: SchedulePeriod;

  @Column("integer", { nullable: true })
  frequency: number;

  @Column("json")
  data: any;

  @OneToMany(() => Task, (task) => task.form)
  tasks: Task[];

  @ManyToOne(() => FormConfiguration, (form) => form.schedules, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  config: FormConfiguration;
}
