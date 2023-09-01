import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";
import { getGetParticipantsKey } from "..";

export const useDeleteParticipant = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<
    { participant: Participant; hardDelete: boolean },
    unknown
  >(
    ({ body: { hardDelete, participant }, ...options }) =>
      apiRequest(`/participants/delete`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
        body: { hardDelete },
      }),
    {
      onSuccess({ queryClient, variables: { participant, hardDelete } }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: false })
        );
        const text = hardDelete ? "record deleted" : "record soft deleted";
        return {
          text,
          params: {
            record: "participant",
            name: participant.number,
          },
        };
      },
    }
  );
};
