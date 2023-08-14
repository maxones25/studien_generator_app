import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfigTypeType } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useUpdateGroupForm = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();
  return useWriteRequest<
    { id: string; type?: FormConfigTypeType; isActive?: boolean },
    unknown
  >(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/groups/${groupId}/forms/${id}`, {
        method: "PUT",
        body,
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId: studyId!, groupId: groupId! })
        );
        return {
          text: "record updated",
          params: {
            record: "form",
            name: variables.id,
          },
        };
      },
    }
  );
};
