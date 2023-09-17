import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";

export interface UseGetGroupsOptions {
  deleted: boolean;
}

export const getGetGroupsKey = (deps: {
  studyId: string;
  deleted: boolean;
}) => ["getGroups", deps];

export const useGetGroups = (options?: UseGetGroupsOptions) => {
  const { deleted = true } = options || {};
  const studyId = useStudyId()!;

  return useReadRequest<Group[]>(
    getGetGroupsKey({ studyId, deleted }),
    (options) =>
      apiRequest(`/groups/getByStudy`, {
        ...options,
        params: { studyId, deleted },
      })
  );
};
