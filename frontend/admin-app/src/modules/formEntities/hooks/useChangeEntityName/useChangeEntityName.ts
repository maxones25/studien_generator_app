import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntityFormData } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useChangeEntityName = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useWriteRequest<Partial<FormEntityFormData>, number>(
    ({ body: { id: entityId, name }, ...options }) =>
      apiRequest(`/forms/changeEntityName`, {
        ...options,
        method: "POST",
        params: { studyId, entityId },
        body: { name },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId, formId }));
        return {
          text: "record updated",
          params: {
            record: "entity",
            name: variables.name ?? "-",
          },
        };
      },
    }
  );
};
