import { Task } from "@modules/tasks/types";
import dayjs from "dayjs";

export enum TasksStates {
  Active = '#85CEE4',
  InActive = '#E4E4E4',
  Completed = '#74BA59',
  Failed = '#C7361B',
}

export const getTaskState = (task: Task) => {
  const timeDiff = dayjs(task.scheduledAt).diff(new Date(), 'hour');
  if (task.completedAt) return TasksStates.Completed

  if (task?.schedule?.restrict?.before && 
    timeDiff > task?.schedule?.restrict?.before)
    return TasksStates.InActive;

  if (task?.schedule?.restrict?.after && 
    timeDiff < task?.schedule?.restrict?.after * -1)
    return TasksStates.Failed;

  return TasksStates.Active;
}