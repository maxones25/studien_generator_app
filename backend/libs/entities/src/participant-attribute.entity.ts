import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Participant } from '.';
import { ParticipantAttributeType } from '@admin/participants/ParticipantAttribute';

@Entity({ name: 'participant_attributes' })
export class ParticipantAttribute {
  @PrimaryColumn()
  participantId: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value: ParticipantAttributeType): string => value,
      from: (value: string): ParticipantAttributeType =>
        value as ParticipantAttributeType,
    },
  })
  key: ParticipantAttributeType;

  @Column('json')
  value: any;

  @ManyToOne(() => Participant, (participant) => participant.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}
