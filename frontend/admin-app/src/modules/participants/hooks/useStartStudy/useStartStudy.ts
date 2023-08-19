import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useStartStudy = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Participant, unknown>(
    ({ body: participant, ...options }) =>
      apiRequest(`/participants/startStudy`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
      }),
    {
      onSuccess({ queryClient, variables: participant }) {
        queryClient.invalidateQueries(getGetParticipantsKey({ studyId }));
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );
        return {
          text: "study started",
          params: {},
        };
      },
    }
  );
};
