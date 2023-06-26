import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Study } from "@modules/studies/types";

export const getGetStudiesKey = () => ["getStudies"];

export const useGetStudies = () => {
  return useReadRequest<Study[]>(getGetStudiesKey(), (options) =>
    apiRequest(`/studies`, { ...options })
  );
};
