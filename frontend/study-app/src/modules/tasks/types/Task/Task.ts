export type Task = {
  id: string;
  scheduledAt: Date;
  name: string;
  formId: string,
  completedAt?: Date,
}