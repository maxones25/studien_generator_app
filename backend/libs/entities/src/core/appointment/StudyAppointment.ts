import { IAppointment } from './Appointment';

export class StudyAppointment implements IAppointment {
  id: string;
  createdAt: Date;
  modifiedAt: Date;
  deletedAt: Date;
  subject: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  originId: string;
  studyId: string;
  groupId: string;
  participantId: string;

  constructor(data: Partial<IAppointment>) {
    for (const key of Object.keys(data)) {
      this[key] = data[key];
    }
    this.groupId = undefined;
    this.participantId = undefined;
  }
}
