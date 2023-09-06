import { Appointment } from '@entities/core/appointment/Appointment';
import { IdEntity } from '@entities/modules/schema/IdEntity';
import { Column, ManyToOne, OneToMany, Entity as TypeOrmEntity } from 'typeorm';
import { GroupSchema, ParticipantSchema, StudySchema } from '..';

export class BaseAppointmentSchema extends IdEntity implements Appointment {
  @Column('date')
  startDate: string;

  @Column('time')
  startTime: string;

  @Column('date')
  endDate: string;

  @Column('time')
  endTime: string;

  @Column()
  subject: string;

  @Column()
  originId: string;

  @Column()
  studyId: string;

  @Column()
  groupId: string;

  @Column()
  participantId: string;
}

@TypeOrmEntity('appointment')
export class AppointmentSchema extends BaseAppointmentSchema {
  @OneToMany(() => AppointmentSchema, (appointment) => appointment.origin)
  exceptions: AppointmentSchema;

  @ManyToOne(() => AppointmentSchema, (appointment) => appointment.exceptions, {
    onDelete: 'SET NULL',
  })
  origin: AppointmentSchema;

  @ManyToOne(() => StudySchema, (study) => study.appointments, {
    onDelete: 'CASCADE',
  })
  study: StudySchema;

  @ManyToOne(() => GroupSchema, (group) => group.appointments, {
    onDelete: 'CASCADE',
  })
  group: GroupSchema;

  @ManyToOne(
    () => ParticipantSchema,
    (participant) => participant.appointments,
    {
      onDelete: 'CASCADE',
    },
  )
  participant: ParticipantSchema;
}
