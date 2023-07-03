import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Field } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetFieldsKey = () => ["getFields"];

export const useGetFields = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useReadRequest<Field[]>(getGetFieldsKey(), (options) =>
    apiRequest(`/studies/${studyId}/entities/${entityId}/fields`, {
      ...options,
    })
  );
};
