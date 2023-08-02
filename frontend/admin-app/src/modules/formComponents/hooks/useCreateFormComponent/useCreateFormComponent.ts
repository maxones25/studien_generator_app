import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponentFormData } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";
import { getGetFormComponentsKey } from "..";
import { getGetFormEntitiesKey } from "@modules/formEntities/hooks";

export const useCreateFormComponent = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  const pageId = usePageId();
  return useWriteRequest<FormComponentFormData, string>(
    (options) =>
      apiRequest(
        `/studies/${studyId}/forms/${formId}/pages/${pageId}/components`,
        {
          method: "POST",
          ...options,
        }
      ),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetFormComponentsKey({
            studyId: studyId!,
            formId: formId!,
            pageId: pageId!,
          })
        );

        queryClient.invalidateQueries(
          getGetFormEntitiesKey({
            studyId: studyId!,
            formId: formId!,
          })
        );
        return {
          text: "record created",
          params: {
            record: "component",
            name: variables.type,
          },
        };
      },
    }
  );
};
