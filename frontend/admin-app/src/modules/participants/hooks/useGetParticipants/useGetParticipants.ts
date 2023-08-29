import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";

export interface UseGetParticipantsOptions {}

export const getGetParticipantsKey = (deps: { studyId: string }) => [
  "getParticipants",
  deps,
];

export const useGetParticipants = () => {
  const studyId = useStudyId()!;

  return useReadRequest<Participant[]>(
    getGetParticipantsKey({ studyId: studyId! }),
    (options) =>
      apiRequest(`/participants/getByStudy`, {
        ...options,
        params: { studyId },
      })
  );
};
