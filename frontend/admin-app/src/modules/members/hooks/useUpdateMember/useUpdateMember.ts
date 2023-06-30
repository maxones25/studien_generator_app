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
      apiRequest(`/studies/${studyId}/members/${directorId}`, {
        method: "PUT",
        ...options,
        body,
      }),
    {
      onSuccess: ({ queryClient, snackbar }) => {
        queryClient.invalidateQueries(getGetStudyKey());
        queryClient.invalidateQueries(getGetMembersKey());
        snackbar.showSuccess(`{{ member updated! }}`);
      },
    }
  );
};
