import { Entity } from '@entities/modules/core/Entity';

export interface Appointment extends Entity {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  subject: string;
  originId: string;
  studyId: string | null;
  groupId: string | null;
  participantId: string | null;
}
