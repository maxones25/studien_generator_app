import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { StartStudyFormData } from "@modules/participants/types";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useStartStudy = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<StartStudyFormData, string>(
    ({ body: { participant, ...body }, ...options }) =>
      apiRequest(`/participants/startStudy`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
        body,
      }),
    {
      onSuccess({ queryClient, variables: { participant, startDate } }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: false })
        );
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
