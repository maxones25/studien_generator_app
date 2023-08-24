import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useStartStudy = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<
    { participant: Participant; startDate: string },
    unknown
  >(
    ({ body: { participant, ...body }, ...options }) =>
      apiRequest(`/participants/startStudy`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
        body,
      }),
    {
      onSuccess({ queryClient, variables: { participant, startDate } }) {
        queryClient.invalidateQueries(getGetParticipantsKey({ studyId }));
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );
        return {
          text: "record started",
          params: {
            record: "participant",
            name: participant.number,
            date: new Date(startDate).toLocaleDateString("de"),
          },
        };
      },
    }
  );
};
