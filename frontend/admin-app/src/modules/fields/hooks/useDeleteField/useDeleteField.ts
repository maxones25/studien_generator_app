import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useDeleteField = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useWriteRequest<FieldFormData, unknown>(
    ({ body: { id: fieldId }, ...options }) =>
      apiRequest(`/entities/removeField`, {
        ...options,
        method: "POST",
        params: { studyId, fieldId },
      }),
    {
      onSuccess: ({ queryClient, variables: field }) => {
        queryClient.invalidateQueries(getGetFieldsKey({ studyId, entityId }));
        return {
          text: "record deleted",
          params: {
            record: "field",
            name: field.name,
          },
        };
      },
    }
  );
};
