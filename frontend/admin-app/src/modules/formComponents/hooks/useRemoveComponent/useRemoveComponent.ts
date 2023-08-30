import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponent } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";
import { getGetComponentsKey } from "..";
import { getGetEntitiesKey } from "@modules/formEntities/hooks";

export const useRemoveComponent = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  const pageId = usePageId()!;
  return useWriteRequest<FormComponent, number>(
    ({ body: { id: componentId }, ...options }) =>
      apiRequest(`/forms/removeComponent`, {
        ...options,
        method: "POST",
        params: { studyId, componentId, pageId },
      }),
    {
      onSuccess({ queryClient, variables: component }) {
        queryClient.invalidateQueries(getGetComponentsKey({ studyId, pageId }));
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId, formId }));
        return {
          text: "record deleted",
          params: {
            record: "component",
            name: component.type,
          },
        };
      },
    }
  );
};
