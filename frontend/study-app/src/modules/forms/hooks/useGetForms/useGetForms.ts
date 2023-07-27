import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";

export interface UseGetFormsOptions {}

export const getGetFormsKey = () => ["getForms"];

export const useGetForms = () => {
  return useReadRequest<FormData[]>(getGetFormsKey(), (options) =>
    apiRequest(`/forms`, { ...options })
  );
}