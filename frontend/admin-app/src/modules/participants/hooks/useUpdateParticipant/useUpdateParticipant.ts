import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { getGetParticipantKey, getGetParticipantsKey } from "..";

export const useUpdateParticipant = () => {
  const studyId = useStudyId();
  const participantId = useParticipantId();

  return useWriteRequest<
    { number?: string; groupId?: string },
    { id: string; number: string }
  >(
    (options) =>
      apiRequest(`/studies/${studyId}/participant`, {
        method: "PUT",
        ...options,
        params: { participantId },
      }),
    {
      onSuccess({ queryClient, data }) {
        queryClient.invalidateQueries(
          getGetParticipantKey({
            studyId: studyId!,
            participantId: participantId!,
          })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({
            studyId: studyId!,
          })
        );
        return {
          text: "record updated",
          params: {
            record: "participant",
            name: data.number,
          },
        };
      },
    }
  );
};
