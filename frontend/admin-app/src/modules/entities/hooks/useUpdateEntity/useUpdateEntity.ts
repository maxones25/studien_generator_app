import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { EntityFormData } from "@modules/entities/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetEntitiesKey } from "..";

export const useUpdateEntity = () => {
  const studyId = useStudyId();

  return useWriteRequest<EntityFormData, unknown>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/entities/${id}`, {
        method: "PUT",
        ...options,
        body,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(getGetEntitiesKey());
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
