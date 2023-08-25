import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupKey, getGetGroupsKey } from "..";

export const useChangeName = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<GroupFormData, void>(
    ({ body: { id: groupId, name }, ...options }) =>
      apiRequest(`/groups/changeName`, {
        ...options,
        method: "POST",
        params: { studyId, groupId },
        body: { name },
      }),
    {
      onSuccess: ({ variables: group, queryClient }) => {
        queryClient.invalidateQueries(getGetGroupsKey({ studyId }));
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
