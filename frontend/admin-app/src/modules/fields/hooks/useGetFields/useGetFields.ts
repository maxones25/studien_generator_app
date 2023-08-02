import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Field } from "@modules/fields/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetFieldsKey = ({ entityId }: { entityId: string }) => [
  "getFields",
  { entityId },
];

export const useGetFields = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useReadRequest<Field[]>(
    getGetFieldsKey({ entityId: entityId! }),
    (options) =>
      apiRequest(`/studies/${studyId}/entities/${entityId}/fields`, {
        ...options,
      })
  );
};
