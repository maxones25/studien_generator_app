import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey, getGetEntityKey } from "..";

export const useChangeName = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<EntityFormData, unknown>(
    ({ body: { id: entityId, name }, ...options }) =>
      apiRequest(`/entities/changeName`, {
        ...options,
        method: "POST",
        params: { studyId, entityId },
        body: { name },
      }),
    {
      onSuccess: ({ variables: entity, queryClient }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId }));
        queryClient.invalidateQueries(
          getGetEntityKey({ studyId, entityId: entity.id! })
        );
        return {
          text: "record updated",
          params: {
            record: "entity",
            name: entity.name,
          },
        };
      },
    }
  );
};
