import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormComponent } from "@modules/formComponents/types";
import { useFormId, usePageId, useStudyId } from "@modules/navigation/hooks";

export const getGetFormComponentsKey = (deps: {
  studyId: string;
  formId: string;
  pageId: string;
}) => ["getFormComponents", deps];

export const useGetFormComponents = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  const pageId = usePageId();
  return useReadRequest<FormComponent[]>(
    getGetFormComponentsKey({
      studyId: studyId!,
      formId: formId!,
      pageId: pageId!,
    }),
    (options) =>
      apiRequest(
        `/studies/${studyId}/forms/${formId}/pages/${pageId}/components`,
        { ...options }
      )
  );
};
