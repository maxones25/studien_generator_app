import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useCreateField = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useWriteRequest<FieldFormData, unknown>(
    (options) =>
      apiRequest(`/studies/${studyId}/entities/${entityId}/fields`, {
        method: "POST",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, snackbar, variables }) => {
        snackbar.showSuccess(`{{ field '${variables.name}' created! }}`);
        queryClient.invalidateQueries(getGetFieldsKey({ entityId: entityId! }));
      },
    }
  );
};
