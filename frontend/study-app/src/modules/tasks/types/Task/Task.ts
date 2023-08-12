export type Task = {
  id: string;
  scheduledAt: Date;
  name: string;
  formId: string,
  postponedTo?: Date,
  completedAt?: Date,
}