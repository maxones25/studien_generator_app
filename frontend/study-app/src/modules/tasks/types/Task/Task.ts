export type Task = {
  id: string;
  scheduledAt: Date;
  name: string;
  formId: string;
  completedAt?: Date;
  schedule: Schedule;
  rescheduled: number;
}

export type Schedule = {
  postpone?: PostPone;
}

export type PostPone = {
  times: number;
  duration: number;
}