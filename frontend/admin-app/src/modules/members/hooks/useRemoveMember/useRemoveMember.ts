import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Member } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetMembersKey, getGetNonStudyMembersKey } from "..";

export const useRemoveMember = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Member, void>(
    ({ body: { director }, ...options }) =>
      apiRequest(`/members/remove`, {
        ...options,
        method: "POST",
        params: { studyId, directorId: director.id },
        body: {},
      }),
    {
      onSuccess({ queryClient, variables: member }) {
        queryClient.invalidateQueries(getGetMembersKey({ studyId }));
        queryClient.invalidateQueries(getGetNonStudyMembersKey({ studyId }));
        return {
          text: "record removed",
          params: {
            mainRecord: "study",
            record: "member",
            name: member.director.email,
          },
        };
      },
    }
  );
};
