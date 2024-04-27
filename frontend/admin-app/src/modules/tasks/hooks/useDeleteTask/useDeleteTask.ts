import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { getGetTasksKey } from "@modules/participants/hooks";
import { Task } from "@modules/participants/types";

export const useDeleteTask = () => {
  const studyId = useStudyId()!;
  const participantId = useParticipantId()!;

  return useWriteRequest<Task, number>(
    ({ body: { id: taskId }, ...options }) =>
      apiRequest(`/participants/deleteTask`, {
        ...options,
        method: "POST",
        params: { studyId, taskId },
      }),
    {
      onSuccess({ queryClient, variables: task }) {
        queryClient.invalidateQueries(
          getGetTasksKey({ studyId, participantId }));

          return {
            text: "record deleted",
            params: {
              record: "task",
              name: new Date(task.scheduledAt).toLocaleDateString("de")
            }
          }
      },
    }
  );
}