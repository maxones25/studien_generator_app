import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Form } from "@modules/forms/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const getGetFormKey = (deps: { formId: string }) => ["getForm", deps];

export const useGetForm = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;
  return useReadRequest<Form>(getGetFormKey({ formId }), (options) =>
    apiRequest(`/forms/getById`, { ...options, params: { studyId, formId } })
  );
};
