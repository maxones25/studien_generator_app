import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Entity } from "@modules/entities/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetEntityKey = (deps: { studyId: string, entityId: string }) => [
  "getEntity",
  deps,
];

export const useGetEntity = () => {
  const studyId = useStudyId()!;
  const entityId = useEntityId()!;

  return useReadRequest<Entity>(getGetEntityKey({ studyId, entityId }), (options) =>
    apiRequest(`/entities/getById`, {
      ...options,
      params: { studyId, entityId },
    })
  );
};
