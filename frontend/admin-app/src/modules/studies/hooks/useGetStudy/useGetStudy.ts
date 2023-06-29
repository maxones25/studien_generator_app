import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Study } from "@modules/studies/types";

export const getGetStudyKey = () => ["getStudy"];

export const useGetStudy = () => {
  const studyId = useStudyId();

  return useReadRequest<Study>(getGetStudyKey(), (options) =>
    apiRequest(`/studies/${studyId}`, { ...options })
  );
};
