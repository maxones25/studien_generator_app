import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director, MemberFormData } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetMembersKey } from "..";
import { getGetStudyKey } from "@modules/studies/hooks";

export const useChangeMemberRole = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<MemberFormData, Director>(
    ({ body: { directorId, ...body }, ...options }) =>
      apiRequest(`/members/changeRole`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          directorId,
        },
        body,
      }),
    {
      onSuccess: ({ queryClient, data: director }) => {
        queryClient.invalidateQueries(getGetStudyKey({ studyId }));
        queryClient.invalidateQueries(getGetMembersKey({ studyId }));
        return {
          text: "record updated",
          params: {
            record: "member",
            name: director.email,
          },
        };
      },
    }
  );
};
