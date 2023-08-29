import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetTasksKey } from "@modules/participants/hooks";
import { TaskFormData } from "@modules/tasks/types";

export const useCreateTask = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<TaskFormData, unknown>(
    ({ body: { id: taskId, participantId, formId, ...body }, ...options }) =>
      apiRequest(`/participants/createTask`, {
        ...options,
        method: "POST",
        params: { studyId, participantId, formId },
        body,
      }),
    {
      onSuccess({ queryClient, variables: task }) {
        queryClient.invalidateQueries(
          getGetTasksKey({ studyId, participantId: task.participantId! })
        );

        return {
          text: "record created",
          params: {
            record: "task",
            name: new Date(task.scheduledAt).toLocaleDateString("de"),
          },
        };
      },
    }
  );
};
