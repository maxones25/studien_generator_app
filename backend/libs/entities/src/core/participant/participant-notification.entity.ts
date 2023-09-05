import { Column, Entity, ManyToOne } from 'typeorm';
import { Task, Participant } from '../..';
import { IdEntity } from '@entities/modules/schema/IdEntity';

export class BaseParticipantNotification extends IdEntity {
  @Column()
  participantId: string;

  @Column({ nullable: true })
  taskId: string;

  @Column({ nullable: true })
  readAt: Date;

  @Column({ nullable: true })
  processed: boolean;

  @Column({ nullable: true })
  oldDate: Date;

  @Column({ nullable: true })
  newDate: Date;
}

@Entity()
export class ParticipantNotification extends BaseParticipantNotification {
  @ManyToOne(() => Participant, (participant) => participant.notifications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;

  @ManyToOne(() => Task, (task) => task.notifications, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  task: Task;
}
