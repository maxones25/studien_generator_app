import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetGroupKey = (deps: { groupId: string }) => ["getGroup", deps];

export const useGetGroup = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;

  return useReadRequest<Group>(getGetGroupKey({ groupId }), (options) =>
    apiRequest(`/groups/getById`, {
      ...options,
      params: { studyId, groupId },
    })
  );
};
