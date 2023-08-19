import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Director, MemberFormData } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetMembersKey, getGetNonStudyMembersKey } from "..";

export const useAddMember = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<MemberFormData, Director>(
    ({ body: { directorId, ...body }, ...options }) =>
      apiRequest(`/members/add`, {
        ...options,
        method: "POST",
        params: { studyId, directorId },
        body,
      }),
    {
      onSuccess: ({ queryClient, data: director }) => {
        queryClient.invalidateQueries(getGetMembersKey({ studyId }));
        queryClient.invalidateQueries(getGetNonStudyMembersKey({ studyId }));
        return {
          text: "record added",
          params: {
            name: director.email,
            record: "member",
            mainRecord: "study",
          },
        };
      },
    }
  );
};
