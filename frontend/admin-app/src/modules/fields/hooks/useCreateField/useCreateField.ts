import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FieldFormData } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";
import { getGetFieldsKey } from "..";

export const useAddField = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useWriteRequest<
    FieldFormData,
    { id: string; entity: { id: string; name: string } }
  >(
    (options) =>
      apiRequest(`/entities/addField`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          entityId,
        },
      }),
    {
      onSuccess: ({ queryClient, variables: field, data }) => {
        queryClient.invalidateQueries(getGetFieldsKey({ studyId, entityId }));
        return {
          text: "record added to record",
          params: {
            addedRecord: "field",
            addedName: field.name,
            record: "entity",
            name: data.entity.name,
          },
        };
      },
    }
  );
};
