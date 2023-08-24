import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Task, Participant } from ".";

@Entity()
export class ParticipantNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  participantId: string;

  @Column({ nullable: true })
  taskId: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  modifiedAt: Date;
  
  @Column({ nullable: true })
  readAt: Date;

  @Column({ nullable: true })
  processed: boolean;

  @Column({ nullable: true })
  oldDate: Date;

  @Column({ nullable: true })
  newDate: Date;

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