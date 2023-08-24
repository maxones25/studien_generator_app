import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupKey, getGetGroupsKey } from "..";

export const useUpdateGroup = () => {
  const studyId = useStudyId();

  return useWriteRequest<GroupFormData, void>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/groups/${id}`, {
        method: "PUT",
        ...options,
        body,
      }),
    {
      onSuccess: ({ variables: group, queryClient }) => {
        queryClient.invalidateQueries(getGetGroupsKey());
        queryClient.invalidateQueries(getGetGroupKey({ groupId: group.id! }));
        return {
          text: "record updated",
          params: {
            record: "group",
            name: group.name,
          },
        };
      },
    }
  );
};
