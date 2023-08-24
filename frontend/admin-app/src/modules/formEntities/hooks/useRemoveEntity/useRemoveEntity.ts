import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntity } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useRemoveEntity = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useWriteRequest<FormEntity, number>(
    ({ body: { id: entityId }, ...options }) =>
      apiRequest(`/forms/removeEntity`, {
        ...options,
        method: "POST",
        params: { studyId, entityId },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId, formId }));
        return {
          text: "record created",
          params: {
            record: "entity",
            name: variables.name,
          },
        };
      },
    }
  );
};
