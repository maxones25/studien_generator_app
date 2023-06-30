import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Member } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetMembersKey = () => ["getMembers"];

export const useGetMembers = () => {
  const studyId = useStudyId()
  
  return useReadRequest<Member[]>(getGetMembersKey(), (options) =>
    apiRequest(`/studies/${studyId}/members`, { ...options })
  );
}