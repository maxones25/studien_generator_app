import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityForm } from "@modules/entities/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetEntityFormsKey = (deps: {
  studyId: string;
  entityId: string;
}) => ["getEntityForms", deps];

export const useGetEntityForms = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useReadRequest<EntityForm[]>(
    getGetEntityFormsKey({ studyId, entityId }),
    (options) =>
      apiRequest(`/forms/getByEntity`, {
        ...options,
        params: {
          studyId,
          entityId,
        },
      })
  );
};
