import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponent } from "@modules/formComponents/types";
import { usePageId, useStudyId } from "@modules/navigation/hooks";

export const getGetComponentsKey = (deps: {
  studyId: string;
  pageId: string;
}) => ["getFormComponents", deps];

export const useGetComponents = () => {
  const studyId = useStudyId()!;
  const pageId = usePageId()!;

  return useReadRequest<FormComponent[]>(
    getGetComponentsKey({
      studyId,
      pageId,
    }),
    (options) =>
      apiRequest(`/forms/getComponents`, {
        ...options,
        params: { studyId, pageId },
      })
  );
};
