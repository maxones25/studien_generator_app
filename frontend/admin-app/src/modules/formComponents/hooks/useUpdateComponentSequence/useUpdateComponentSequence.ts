import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponentsSequence } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";
import { getGetComponentsKey } from "..";
import { getGetEntitiesKey } from "@modules/formEntities/hooks";

export const useUpdateComponentSequence = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  const pageId = usePageId()!;

  return useWriteRequest<FormComponentsSequence, string>(
    (options) =>
      apiRequest(`/forms/updateComponentSequence`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          formId
        },
      }),
    {
      onSuccess: ({ queryClient }) => {
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
          text: "records updated",
          params: {
            record: 'component'
          },
        };
      },
    }
  );
};
