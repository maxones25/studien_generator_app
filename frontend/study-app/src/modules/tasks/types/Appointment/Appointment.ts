export type Appointment = {
  id: string;
  start: Date;
  end?: Date;
  name: string;
  deletedAt?: Date;
}