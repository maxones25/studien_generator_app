import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { LoginData, Participant } from "@modules/participants/types";

export const useResetPassword = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Participant, LoginData>(
    ({ body: { id: participantId }, ...options }) =>
      apiRequest(`/participants/resetPassword`, {
        ...options,
        method: "POST",
        params: { studyId, participantId },
      })
  );
};
