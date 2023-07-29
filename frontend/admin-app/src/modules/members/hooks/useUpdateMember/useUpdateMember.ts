import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { MemberFormData } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetMembersKey } from "..";
import { getGetStudyKey } from "@modules/studies/hooks";

export const useUpdateMember = () => {
  const studyId = useStudyId();

  return useWriteRequest<MemberFormData, unknown>(
    ({ body: { directorId, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/directors/${directorId}`, {
        method: "PUT",
        ...options,
        body,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetStudyKey());
        queryClient.invalidateQueries(getGetMembersKey());
        return {
          text: "record updated",
          params: {
            record: "member",
            name: variables.directorId,
          },
        };
      },
    }
  );
};
