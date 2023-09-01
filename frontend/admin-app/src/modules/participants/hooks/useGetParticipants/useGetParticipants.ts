import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Participant } from "@modules/participants/types";

export interface UseGetParticipantsOptions {
  deleted?: boolean;
}

export const getGetParticipantsKey = (deps: {
  studyId: string;
  deleted: boolean;
}) => ["getParticipants", deps];

export const useGetParticipants = (options?: UseGetParticipantsOptions) => {
  const { deleted = false } = options || {};
  const studyId = useStudyId()!;

  return useReadRequest<Participant[]>(
    getGetParticipantsKey({ studyId, deleted }),
    (options) =>
      apiRequest(`/participants/getByStudy`, {
        ...options,
        params: { studyId, deleted },
      })
  );
};
