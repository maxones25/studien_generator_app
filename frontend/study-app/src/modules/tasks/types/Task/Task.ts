export type Task = {
  id: string;
  scheduledAt: Date;
  name: string;
  formId: string;
  completedAt?: Date;
  schedule?: Schedule;
  rescheduled: number;
  deletedAt?: Date;
}

export type Schedule = {
  postpone?: PostPone;
  restrict?: Restrict;
}

export type PostPone = {
  times: number;
  duration: number;
}

export type Restrict = {
  before: number;
  after: number;
}