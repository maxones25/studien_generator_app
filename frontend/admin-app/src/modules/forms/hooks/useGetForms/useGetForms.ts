import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Form } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetFormsKey = () => ["getForms"];

export const useGetForms = () => {
  const studyId = useStudyId()
  return useReadRequest<Form[]>(getGetFormsKey(), (options) =>
    apiRequest(`/studies/${studyId}/forms`, { ...options })
  );
}