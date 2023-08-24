import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey, getGetEntityKey } from "..";

export const useDeleteEntity = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<EntityFormData, unknown>(
    ({ body: { id: entityId }, ...options }) =>
      apiRequest(`/entities/deleteEntity`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          entityId,
        },
      }),
    {
      onSuccess: ({ variables: entity, queryClient }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId }));
        queryClient.invalidateQueries(
          getGetEntityKey({ studyId, entityId: entity.id! })
        );
        return {
          text: "record deleted",
          params: {
            record: "entity",
            name: entity.name,
          },
        };
      },
    }
  );
};
