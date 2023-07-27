import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormPageFormData } from "@modules/formPages/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const useAddFormPage = () => {
  const studyId = useStudyId();
  const formId = useFormId();
  return useWriteRequest<FormPageFormData, string>((options) =>
    apiRequest(`/studies/${studyId}/forms/${formId}/pages`, {
      method: "POST",
      ...options,
    })
  );
};
