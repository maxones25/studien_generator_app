import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Record } from "@modules/records/types";

export interface UseGetRecordsOptions {
  entityId: string | null;
  formId: string | null;
  groupId: string | null;
  participantId: string | null;
  counter: number;
}

interface KeyDeps extends UseGetRecordsOptions {
  studyId: string;
}
export const getGetRecordsKey = (deps: KeyDeps) => ["getRecords", deps];
export const useGetRecords = ({
  entityId,
  groupId,
  participantId,
  formId,
  counter,
}: UseGetRecordsOptions) => {
  const studyId = useStudyId()!;
  return useReadRequest<Record[]>(
    getGetRecordsKey({
      studyId,
      entityId,
      groupId,
      formId,
      participantId,
      counter,
    }),
    (options) =>
      apiRequest(`/records`, {
        ...options,
        params: { entityId, studyId, groupId, formId, participantId },
      })
  );
};
