import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useUpdateField = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useWriteRequest<FieldFormData, unknown>(
    ({ body: { id: fieldId, ...body }, ...options }) =>
      apiRequest(`/entities/updateField`, {
        ...options,
        method: "POST",
        params: { studyId, fieldId },
        body,
      }),
    {
      onSuccess: ({ variables: field, queryClient }) => {
        queryClient.invalidateQueries(getGetFieldsKey({ studyId, entityId }));
        return {
          text: "record updated",
          params: {
            record: "field",
            name: field.name,
          },
        };
      },
    }
  );
};
