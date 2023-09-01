import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useRemoveGroup = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Participant, unknown>(
    ({ body: participant, ...options }) =>
      apiRequest(`/participants/removeGroup`, {
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
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );

        return {
          text: "record removed",
          params: {
            mainRecord: "participant",
            record: "group",
            name: participant.group?.name ?? "-",
          },
        };
      },
    }
  );
};
