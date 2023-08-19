import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetNonStudyMembersKey = (deps: { studyId: string }) => [
  "getNonStudyMembers",
  deps,
];

export const useGetNonStudyMembers = () => {
  const studyId = useStudyId()!;
  return useReadRequest<Director[]>(
    getGetNonStudyMembersKey({ studyId }),
    (options) =>
      apiRequest(`/studies/getNonStudyMembers`, {
        ...options,
        params: { studyId },
      })
  );
};
