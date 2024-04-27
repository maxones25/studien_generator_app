export type Task = {
  id: string;
  originalScheduledAt: string;
  scheduledAt: string;
  completedAt: null | string;
  rescheduled: number;
  form: { id: string; name: string };
  deletedAt?: Date;
};
