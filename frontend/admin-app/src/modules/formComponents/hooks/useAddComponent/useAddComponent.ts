import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponentFormData } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";
import { getGetComponentsKey } from "..";
import { getGetEntitiesKey } from "@modules/formEntities/hooks";

export const useAddComponent = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  const pageId = usePageId()!;

  return useWriteRequest<FormComponentFormData, string>(
    (options) =>
      apiRequest(`/forms/addComponent`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          pageId,
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
