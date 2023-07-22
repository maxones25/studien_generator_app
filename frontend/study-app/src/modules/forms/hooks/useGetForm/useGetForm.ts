import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormData } from "@modules/forms/types";

export interface UseGetFormOptions {
  formId: string
}

export const getGetFormKey = () => ["getForm"];

export const useGetForm = (options? : UseGetFormOptions) => {
  const formId = options?.formId;
  return useReadRequest<FormData>(getGetFormKey(), (options) =>
  apiRequest(`/forms/${formId}`, { ...options })
  );
}