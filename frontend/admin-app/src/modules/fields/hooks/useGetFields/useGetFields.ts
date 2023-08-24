import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Field } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetFieldsKey = (deps: {
  studyId: string;
  entityId: string;
}) => ["getFields", deps];

export const useGetFields = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useReadRequest<Field[]>(
    getGetFieldsKey({ studyId, entityId }),
    (options) =>
      apiRequest(`/entities/getFields`, {
        ...options,
        params: { studyId, entityId },
      })
  );
};
