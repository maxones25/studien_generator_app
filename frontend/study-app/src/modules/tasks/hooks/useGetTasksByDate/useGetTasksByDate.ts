import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Task } from "@modules/tasks/types";

export interface UseGetTasksByDateOptions {
  date: Date;
}

export const getGetTasksByDateKey = () => ["getTasksByDate"];

export const useGetTasksByDate = (options? : UseGetTasksByDateOptions) => {
  const date = options?.date;
  return useReadRequest<Task[]>(getGetTasksByDateKey(), (options) =>
    apiRequest(`/tasks/${date}`, { ...options })
  );
}