import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";

export const useChangeParticipantNumber = () => {
  const studyId = useStudyId();
  const participantId = useParticipantId();
  return useWriteRequest<{ number: string }, number>(
    (options) =>
      apiRequest(`/studies/${studyId}/changeParticipantNumber`, {
        ...options,
        method: "POST",
        params: {
          participantId,
        },
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries();
        return {
          text: "record updated",
          params: {
            record: "participant",
            name: variables.number,
          },
        };
      },
    }
  );
};
