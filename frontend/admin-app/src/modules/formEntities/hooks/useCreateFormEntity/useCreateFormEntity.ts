import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntityFormData } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormEntitiesKey } from "..";

export const useCreateFormEntity = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<FormEntityFormData, string>(
    ({ ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/entities`, {
        method: "POST",
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
            record: "formEntity",
            name: variables.name,
          },
        };
      },
    }
  );
};
