import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetGroupKey = () => ["getGroup"];

export const useGetGroup = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();

  return useReadRequest<Group>(getGetGroupKey(), (options) =>
    apiRequest(`/studies/${studyId}/groups/${groupId}`, { ...options })
  );
};
