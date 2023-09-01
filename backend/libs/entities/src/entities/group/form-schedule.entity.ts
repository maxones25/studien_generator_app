import { Entity as TypeOrmEntity, Column, ManyToOne, OneToMany } from 'typeorm';
import { Task } from '../..';
import { FormConfiguration, FormScheduleAttribute } from '../..';
import { FormScheduleType } from '@admin/forms/configs/enums/FormScheduleType';
import { FormSchedulePeriod } from '@admin/forms/configs/enums/FormSchedulePeriod';
import { IdEntity } from '@entities/modules/IdEntity';

export type Postpone = {
  times: number;
  duration: number;
};

export class BaseFormSchedule extends IdEntity {
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
}

@TypeOrmEntity()
export class FormSchedule extends BaseFormSchedule {
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
