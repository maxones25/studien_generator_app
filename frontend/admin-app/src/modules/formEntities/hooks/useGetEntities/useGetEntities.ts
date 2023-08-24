import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormEntity } from "@modules/formEntities/types";
import { useFormId, useStudyId } from "@modules/navigation/hooks";

export const getGetEntitiesKey = (deps: {
  studyId: string;
  formId: string;
}) => ["getEntities", deps];

export const useGetEntities = () => {
  const studyId = useStudyId()!;
  const formId = useFormId()!;

  return useReadRequest<FormEntity[]>(
    getGetEntitiesKey({ studyId, formId }),
    (options) =>
      apiRequest(`/forms/getEntities`, {
        ...options,
        params: { studyId, formId },
      })
  );
};
