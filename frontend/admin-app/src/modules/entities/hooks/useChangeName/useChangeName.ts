import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

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
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(getGetEntitiesKey({ studyId }));
        return {
          text: "record updated",
          params: {
            record: "entity",
            name: variables.name,
          },
        };
      },
    }
  );
};
