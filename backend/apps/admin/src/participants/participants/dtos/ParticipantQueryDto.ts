import { IsUUID } from 'class-validator';

export class ParticipantQueryDto {
  @IsUUID()
  participantId: string;
}
