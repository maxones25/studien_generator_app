import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Task } from "@modules/tasks/types";

export interface UseGetTasksOptions {}

export const getGetTasksKey = () => ["getTasks"];

export const useGetTasks = (options? : UseGetTasksOptions) => {
  return useReadRequest<Task[]>(getGetTasksKey(), (options) =>
    apiRequest(`/tasks`, { ...options })
  );
}