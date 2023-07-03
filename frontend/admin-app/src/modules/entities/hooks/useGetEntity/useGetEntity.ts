import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Entity } from "@modules/entities/types";
import { useEntityId, useStudyId } from "@modules/navigation/hooks";

export const getGetEntityKey = (id?: string) => ["getEntity", { id }];

export const useGetEntity = () => {
  const studyId = useStudyId();
  const entityId = useEntityId();

  return useReadRequest<Entity>(getGetEntityKey(entityId), (options) =>
    apiRequest(`/studies/${studyId}/entities/${entityId}`, { ...options })
  );
};
