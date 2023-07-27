import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPage } from "@modules/formPages/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const getGetFormPagesKey = (deps: {
  studyId: string;
  formId: string;
}) => ["getFormPages", deps];

export const useGetFormPages = () => {
  const studyId = useStudyId();
  const formId = useFormId();

  return useReadRequest<FormPage[]>(
    getGetFormPagesKey({ studyId, formId }),
    (options) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/pages`, { ...options })
  );
};
