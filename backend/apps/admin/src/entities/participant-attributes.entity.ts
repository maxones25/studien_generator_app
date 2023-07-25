import {
  Entity,
  Column,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Participant } from './participant.entity';

@Entity()
export class ParticipantAttributes {
  @PrimaryColumn()
  participantId: string;

  @PrimaryColumn()
  key: string;

  @Column("json")
  value: any;

  @ManyToOne(() => Participant, (participant) => participant.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}
