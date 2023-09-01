import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Group } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupsKey } from "..";

export const useDeleteGroup = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<
    { group: Group; hardDelete: boolean; deleteRelated: boolean },
    unknown
  >(
    ({ body: { group, hardDelete, deleteRelated }, ...options }) =>
      apiRequest(`/groups/delete`, {
        ...options,
        method: "POST",
        params: { studyId, groupId: group.id },
        body: { hardDelete, deleteRelated },
      }),
    {
      onSuccess: ({ variables: { group, hardDelete }, queryClient }) => {
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: true })
        );
        queryClient.invalidateQueries(
          getGetGroupsKey({ studyId, deleted: false })
        );
        const text = hardDelete ? "record deleted" : "record soft deleted";
        return {
          text,
          params: {
            record: "group",
            name: group.name,
          },
        };
      },
    }
  );
};
