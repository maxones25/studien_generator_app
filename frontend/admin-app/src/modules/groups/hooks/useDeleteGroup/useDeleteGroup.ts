import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupsKey } from "..";

export const useDeleteGroup = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<GroupFormData, void>(
    ({ body: { id: groupId }, ...options }) =>
      apiRequest(`/groups/delete`, {
        ...options,
        method: "POST",
        params: { studyId, groupId },
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(getGetGroupsKey({ studyId }));
        return {
          text: "record deleted",
          params: {
            record: "group",
            name: variables.name,
          },
        };
      },
    }
  );
};
