import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useDeleteParticipant = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Participant, unknown>(
    ({ body: { id: participantId }, ...options }) =>
      apiRequest(`/participants/delete`, {
        ...options,
        method: "POST",
        params: { studyId, participantId },
      }),
    {
      onSuccess({ queryClient, variables: participant }) {
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );
        queryClient.invalidateQueries(getGetParticipantsKey({ studyId }));
        return {
          text: "record deleted",
          params: {
            record: "participant",
            name: participant.number,
          },
        };
      },
    }
  );
};
