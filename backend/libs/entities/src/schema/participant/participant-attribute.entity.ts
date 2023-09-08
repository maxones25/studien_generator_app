import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { AttributeKey } from '@shared/modules/records/attribute.repository';
import { ParticipantSchema } from '..';
import { BaseEntity } from '@entities/modules/schema/BaseEntity';

export type ParticipantsAttributes = {
  startedAt: string | null;
  endedAt: string | null;
};

export class BaseParticipantAttribute extends BaseEntity {
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
}

@Entity({ name: 'participant_attributes' })
export class ParticipantAttribute extends BaseParticipantAttribute {
  @ManyToOne(() => ParticipantSchema, (participant) => participant.attributes, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  participant: ParticipantSchema;
}
