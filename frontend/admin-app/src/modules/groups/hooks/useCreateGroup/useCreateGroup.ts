import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group, GroupFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupsKey } from "..";

export const useCreateGroup = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<GroupFormData, Group>(
    (options) =>
      apiRequest(`/groups/create`, {
        ...options,
        method: "POST",
        params: { studyId },
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: false })
        );
        return {
          text: "record created",
          params: {
            record: "group",
            name: variables.name,
          },
        };
      },
    }
  );
};
