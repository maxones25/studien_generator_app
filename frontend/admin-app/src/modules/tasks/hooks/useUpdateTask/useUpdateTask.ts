import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { getGetTasksKey } from "@modules/participants/hooks";
import { TaskFormData } from "@modules/tasks/types";

export const useUpdateTask = () => {
  const studyId = useStudyId()!;
  const participantId = useParticipantId()!;

  return useWriteRequest<TaskFormData, number>(
    ({ body: { id: taskId, ...body }, ...options }) =>
      apiRequest(`/participants/updateTask`, {
        ...options,
        method: "POST",
        params: { studyId, taskId },
        body,
      }),
    {
      onSuccess({ queryClient, variables: task }) {
        queryClient.invalidateQueries(
          getGetTasksKey({ studyId, participantId }));

          return {
            text: "record updated",
            params: {
              record: "task",
              name: new Date(task.scheduledAt).toLocaleDateString("de")
            }
          }
      },
    }
  );
};
