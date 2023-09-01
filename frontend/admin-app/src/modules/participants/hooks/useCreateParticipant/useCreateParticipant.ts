import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { ParticipantFormData } from "@modules/participants/types";
import { getGetParticipantsKey } from "..";

export const useCreateParticipant = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<ParticipantFormData, string>(
    (options) =>
      apiRequest(`/participants/create`, {
        ...options,
        method: "POST",
        params: {
          studyId,
        },
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId, deleted: false })
        );
        return {
          text: "record created",
          params: {
            record: "participant",
            name: variables.number,
          },
        };
      },
    }
  );
};
