import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useDeleteEntity = () => {
  const studyId = useStudyId();

  return useWriteRequest<EntityFormData, unknown>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/entities/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient, snackbar }) => {
        snackbar.showSuccess(`{{ entity '${variables.name}' deleted! }}`);
        queryClient.invalidateQueries(getGetEntitiesKey());
      },
    }
  );
};
