import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useCreateEntity = () => {
  const studyId = useStudyId();

  return useWriteRequest<EntityFormData, unknown>(
    (options) =>
      apiRequest(`/studies/${studyId}/entities`, {
        method: "POST",
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(getGetEntitiesKey());
        return {
          text: "record created",
          params: {
            record: "entity",
            name: variables.name,
          },
        };
      },
    }
  );
};
