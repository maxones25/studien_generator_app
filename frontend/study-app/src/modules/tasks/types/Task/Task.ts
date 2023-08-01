export type Task = {
  id: string,
  name: string,
  formId: string,
  scheduledAt: Date,
  postponedTo?: Date,
  completedAt?: Date,
}