import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group, GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupsKey } from "..";

export const useCreateGroup = () => {
  const studyId = useStudyId();

  return useWriteRequest<GroupFormData, Group>(
    (options) =>
      apiRequest(`/studies/${studyId}/groups`, { method: "POST", ...options }),
    {
      onSuccess: ({ data, snackbar, queryClient }) => {
        snackbar.showSuccess(`{{ group '${data.name}' created! }}`);
        queryClient.invalidateQueries(getGetGroupsKey());
      },
    }
  );
};
