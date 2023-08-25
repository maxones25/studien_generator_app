import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormData } from "@modules/forms/types";

export interface UseGetFormOptions {
  formId: string
}

export const getGetFormKey = (formId: string) => ["getForm"+formId];

export const useGetForm = (options : UseGetFormOptions) => {
  const formId = options.formId;
  return useReadRequest<FormData>(getGetFormKey(formId), (options) =>
  apiRequest(`/forms`, { params: {
    formId: formId,
  }, ...options })
  );
}