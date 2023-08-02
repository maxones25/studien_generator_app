import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntityFormData } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormEntitiesKey } from "..";

export const useUpdateFormEntity = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<Partial<FormEntityFormData>, number>(
    ({ body: { id, name }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/entities/${id}`, {
        method: "PUT",
        body: { name },
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(
          getGetFormEntitiesKey({ studyId: studyId!, formId: formId! })
        );
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
