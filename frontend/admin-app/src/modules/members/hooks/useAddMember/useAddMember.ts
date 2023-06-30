import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { MemberFormData } from "@modules/members/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetMembersKey } from "..";

export const useAddMember = () => {
  const studyId = useStudyId();

  return useWriteRequest<MemberFormData, void>(
    (options) =>
      apiRequest(`/studies/${studyId}/members`, { method: "POST", ...options }),
    {
      onSuccess: ({ queryClient, snackbar }) => {
        queryClient.invalidateQueries(getGetMembersKey());
        snackbar.showSuccess(`{{ member added! }}`);
      },
    }
  );
};
