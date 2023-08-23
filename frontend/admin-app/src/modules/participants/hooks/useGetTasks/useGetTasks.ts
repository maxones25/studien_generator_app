import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { Task } from "@modules/participants/types";

export const getGetTasksKey = (deps: {
  studyId: string;
  participantId: string;
}) => ["getTasks", deps];

export const useGetTasks = () => {
  const studyId = useStudyId()!;
  const participantId = useParticipantId()!;
  return useReadRequest<Task[]>(
    getGetTasksKey({ studyId, participantId }),
    (options) =>
      apiRequest(`/participants/getTasks`, {
        ...options,
        params: { studyId, participantId },
      })
  );
};
