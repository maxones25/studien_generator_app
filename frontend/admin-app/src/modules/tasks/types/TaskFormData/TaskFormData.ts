import { Task } from "@modules/participants/types";
export type TaskFormData = {
  id?: string;
  formId?: string;
  participantId?: string;
} & Omit<Task, "id" | "originalScheduledAt" | "form">;
