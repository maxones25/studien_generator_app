import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Member } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetMembersKey = (deps: { studyId: string }) => [
  "getMembers",
  deps,
];

export const useGetMembers = () => {
  const studyId = useStudyId()!;

  return useReadRequest<Member[]>(getGetMembersKey({ studyId }), (options) =>
    apiRequest(`/members/getByStudy`, { ...options, params: { studyId } })
  );
};
