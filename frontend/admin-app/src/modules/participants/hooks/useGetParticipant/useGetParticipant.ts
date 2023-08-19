import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";

export interface UseGetParticipantOptions {}

export const getGetParticipantKey = (deps: { participantId: string }) => [
  "getParticipant",
  deps,
];

export const useGetParticipant = () => {
  const studyId = useStudyId();
  const participantId = useParticipantId();
  return useReadRequest<Participant>(
    getGetParticipantKey({ participantId: participantId! }),
    (options) =>
      apiRequest(`/studies/${studyId}/participants/getById`, {
        ...options,
        params: { participantId },
      })
  );
};
