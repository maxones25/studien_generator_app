import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantsKey } from "..";

export const useRestoreParticipant = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Participant, unknown>(
    ({ body: participant, ...options }) =>
      apiRequest(`/participants/restore`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
      }),
    {
      onSuccess({ queryClient, variables: participant }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: false })
        );

        return {
          text: "record restored",
          params: {
            record: "participant",
            name: participant.number,
          },
        };
      },
    }
  );
};
