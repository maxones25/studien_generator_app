import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntity } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormEntitiesKey } from "..";

export const useDeleteFormEntity = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<FormEntity, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/entities/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(
          getGetFormEntitiesKey({ studyId: studyId!, formId: formId! })
        );
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
