import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntityFormData } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useAddEntity = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  return useWriteRequest<FormEntityFormData, string>(
    ({ body: { entityId, ...body }, ...options }) =>
      apiRequest(`/forms/addEntity`, {
        ...options,
        method: "POST",
        params: { studyId, formId, entityId },
        body,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId, formId }));
        return {
          text: "record created",
          params: {
            record: "formEntity",
            name: variables.name,
          },
        };
      },
    }
  );
};
