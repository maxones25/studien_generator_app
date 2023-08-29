import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { MinimalParticipant } from "@modules/participants/types";

export interface UseGetGroupParticipantsOptions {}

export const getGetGroupParticipantsKey = (deps: {
  studyId: string;
  groupId: string;
}) => ["getGroupParticipants", deps];

export const useGetGroupParticipants = (groupId: string) => {
  const studyId = useStudyId()!;
  return useReadRequest<MinimalParticipant[]>(
    getGetGroupParticipantsKey({ studyId, groupId }),
    (options) =>
      apiRequest(`/participants/getByGroup`, {
        ...options,
        params: { studyId, groupId },
      })
  );
};
