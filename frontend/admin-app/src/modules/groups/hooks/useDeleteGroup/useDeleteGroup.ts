import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupsKey } from "..";

export const useDeleteGroup = () => {
  const studyId = useStudyId();

  return useWriteRequest<GroupFormData, void>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/groups/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient, snackbar }) => {
        snackbar.showSuccess(`{{ group '${variables.name}' deleted! }}`);
        queryClient.invalidateQueries(getGetGroupsKey());
      },
    }
  );
};
