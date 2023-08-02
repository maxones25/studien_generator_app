import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useDeleteField = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useWriteRequest<FieldFormData, unknown>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/entities/${entityId}/fields/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, snackbar, variables }) => {
        queryClient.invalidateQueries(getGetFieldsKey({ entityId: entityId! }));
        snackbar.showSuccess(`{{ field '${variables.name}' deleted! }}`);
      },
    }
  );
};
