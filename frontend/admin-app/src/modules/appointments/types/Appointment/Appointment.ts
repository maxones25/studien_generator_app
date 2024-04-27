export type Appointment = {
  id: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  subject: string;
  deletedAt?: Date;
};
