import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { AttributeKey } from '@shared/modules/records/attribute.repository';
import { Participant } from '.';

export type ParticipantsAttributes = {
  startedAt: string | null;
  endedAt: string | null;
};

@Entity({ name: 'participant_attributes' })
export class ParticipantAttribute {
  @PrimaryColumn()
  participantId: string;

  @PrimaryColumn({
    type: 'varchar',
    length: 255,
    transformer: {
      to: (value) => value,
      from: (value) => value as AttributeKey<ParticipantsAttributes>,
    },
  })
  key: AttributeKey<ParticipantsAttributes>;

  @Column('json')
  value: any;

  @ManyToOne(() => Participant, (participant) => participant.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: Participant;
}
