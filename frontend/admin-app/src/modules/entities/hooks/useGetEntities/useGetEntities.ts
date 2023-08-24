import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Entity } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetEntitiesKey = (deps: { studyId: string }) => [
  "getEntities",
  deps,
];

export const useGetEntities = () => {
  const studyId = useStudyId()!;

  return useReadRequest<Entity[]>(getGetEntitiesKey({ studyId }), (options) =>
    apiRequest(`/entities/getAll`, { ...options, params: { studyId } })
  );
};
