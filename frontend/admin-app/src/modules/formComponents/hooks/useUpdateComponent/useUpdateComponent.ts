import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponentFormData } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";
import { getGetComponentsKey } from "..";
import { getGetEntitiesKey } from "@modules/formEntities/hooks";

export const useUpdateComponent = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  const pageId = usePageId()!;

  return useWriteRequest<FormComponentFormData, string>(
    (options) =>
      apiRequest(`/forms/updateComponent`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          formId,
          componentId: options.body.id,
        },
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetComponentsKey({
            studyId,
            pageId,
          })
        );

        queryClient.invalidateQueries(
          getGetEntitiesKey({
            studyId,
            formId,
          })
        );
        return {
          text: "record updated",
          params: {
            record: "component",
            name: variables.type,
          },
        };
      },
    }
  );
};
