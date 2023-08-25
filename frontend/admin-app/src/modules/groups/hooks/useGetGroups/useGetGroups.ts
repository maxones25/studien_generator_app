import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetGroupsKey = (deps: { studyId: string }) => [
  "getGroups",
  deps,
];

export const useGetGroups = () => {
  const studyId = useStudyId()!;

  return useReadRequest<Group[]>(getGetGroupsKey({ studyId }), (options) =>
    apiRequest(`/groups/getByStudy`, { ...options, params: { studyId } })
  );
};
