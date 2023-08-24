export type Task = {
  id: string;
  originalScheduledAt: string;
  scheduledAt: string;
  completedAt: null | string;
  postponable: boolean;
  rescheduled: number;
  form: { id: string; name: string };
};
