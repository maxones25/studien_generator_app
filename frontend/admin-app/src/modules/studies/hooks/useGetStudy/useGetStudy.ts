import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { Study } from "@modules/studies/types";

export const getGetStudyKey = (deps: { studyId: string }) => ["getStudy", deps];

export const useGetStudy = () => {
  const studyId = useStudyId()!;

  return useReadRequest<Study>(getGetStudyKey({ studyId }), (options) =>
    apiRequest(`/studies/getById`, { ...options, params: { studyId } })
  );
};
