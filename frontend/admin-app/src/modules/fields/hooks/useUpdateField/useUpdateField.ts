import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useUpdateField = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();
  const entityId = useEntityId();

  return useWriteRequest<FieldFormData, unknown>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/entities/${entityId}/fields/${id}`, {
        method: "PUT",
        ...options,
        body,
      }),
    {
      onSuccess: ({ variables, queryClient, snackbar }) => {
        snackbar.showSuccess(`{{ field '${variables.name}' updated! }}`);
        queryClient.invalidateQueries(getGetFieldsKey({ entityId, groupId }));
      },
    }
  );
};
