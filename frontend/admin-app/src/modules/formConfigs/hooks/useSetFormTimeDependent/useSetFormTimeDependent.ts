import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey, getGetNonGroupFormsKey } from "..";

export const useSetFormTimeDependent = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<FormConfig, boolean>(
    ({ body: { id: configId }, ...options }) =>
      apiRequest(`/groups/setFormConfigTimeDependent`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          configId,
        },
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId, groupId })
        );
        queryClient.invalidateQueries(
          getGetNonGroupFormsKey({
            studyId,
            groupId,
          })
        );
        return {
          text: "set form time dependent",
          params: {
            form: variables.form.name,
          },
        };
      },
    }
  );
};
