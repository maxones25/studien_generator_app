import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetParticipantKey, getGetParticipantsKey } from "..";
import { Participant } from "@modules/participants/types";

export const useChangeParticipantGroup = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<{ group: Group; participant: Participant }, number>(
    ({ body: { participant, group }, ...options }) =>
      apiRequest(`/participants/changeGroup`, {
        ...options,
        method: "POST",
        params: { studyId, participantId: participant.id },
        body: { groupId: group.id },
      }),
    {
      onSuccess({ queryClient, variables: { group, participant } }) {
        queryClient.invalidateQueries(getGetParticipantsKey({ studyId, deleted: true }));
        queryClient.invalidateQueries(getGetParticipantsKey({ studyId, deleted: false }));
        queryClient.invalidateQueries(
          getGetParticipantKey({ participantId: participant.id })
        );
        return {
          text: "record added to record",
          params: {
            addedRecord: "group",
            addedName: group.name,
            record: "participant",
            name: participant.number,
          },
        };
      },
    }
  );
};
