import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupKey, getGetGroupsKey } from "..";

export const useRestoreGroup = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<Group, unknown>(
    ({ body: { id: groupId }, ...options }) =>
      apiRequest(`/groups/restore`, {
        ...options,
        method: "POST",
        params: { studyId, groupId },
      }),
    {
      onSuccess({ queryClient, variables: group }) {
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: false })
        );
        queryClient.invalidateQueries(getGetGroupKey({ groupId: group.id }));

        return {
          text: "record restored",
          params: {
            record: "group",
            name: group.name,
          },
        };
      },
    }
  );
};
