import { useReadRequest } from "@modules/core/hooks";
// import { apiRequest } from "@modules/core/utils";
import { Task } from "@modules/tasks/types";

export interface UseGetTasksOptions {}

export const getGetTasksKey = () => ["getTasks"];

export const useGetTasks = () => {
  return useReadRequest<Task[]>(getGetTasksKey(), (_options) =>
    // apiRequest(`/tasks`, { ...options })
    new Promise((resolve) => {
      resolve(
        [
          { formId: 'F001', id: 'T01', name: 'Aufgabe A', scheduledAt: new Date('2023-02-05T08:00:00') },
          { formId: 'F002', id: 'T02', name: 'Aufgabe B', scheduledAt: new Date('2023-02-05T11:00:00') },
          { formId: 'F003', id: 'T03', name: 'Aufgabe C', scheduledAt: new Date('2023-02-06T12:00:00') },
          { formId: 'F004', id: 'T04', name: 'Aufgabe D', scheduledAt: new Date('2023-02-07T10:00:00') },
          { formId: 'F005', id: 'T05', name: 'Aufgabe E', scheduledAt: new Date('2023-02-08T09:00:00') },
          { formId: 'F006', id: 'T06', name: 'Aufgabe F', scheduledAt: new Date('2023-02-05T15:00:00') },
          { formId: 'F007', id: 'T07', name: 'Aufgabe G', scheduledAt: new Date('2023-02-06T11:00:00') },
          { formId: 'F008', id: 'T08', name: 'Aufgabe H', scheduledAt: new Date('2023-02-07T13:00:00') },
          { formId: 'F009', id: 'T09', name: 'Aufgabe I', scheduledAt: new Date('2023-02-08T14:00:00') },
          { formId: 'F010', id: 'T10', name: 'Aufgabe J', scheduledAt: new Date('2023-02-05T16:00:00') },
        ]
      )
    })
  );
}

