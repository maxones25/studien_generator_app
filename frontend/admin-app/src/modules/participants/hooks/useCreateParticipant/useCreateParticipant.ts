import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { ParticipantFormData } from "@modules/participants/types";
import { getGetParticipantsKey } from "..";

export const useCreateParticipant = () => {
  const studyId = useStudyId();
  return useWriteRequest<ParticipantFormData, string>(
    (options) =>
      apiRequest(`/studies/${studyId}/participants`, {
        method: "POST",
        ...options,
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries(
          getGetParticipantsKey({ studyId: studyId! })
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
