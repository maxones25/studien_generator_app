import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetGroupsKey = () => ["getGroups"];

export const useGetGroups = () => {
  const studyId = useStudyId();

  return useReadRequest<Group[]>(getGetGroupsKey(), (options) =>
    apiRequest(`/studies/${studyId}/groups`, { ...options })
  );
};
