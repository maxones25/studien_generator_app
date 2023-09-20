import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey, getGetNonGroupFormsKey } from "..";

export const useSetFormTimeIndependent = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<FormConfig, boolean>(
    ({ body: { id: configId }, ...options }) =>
      apiRequest(`/groups/setFormConfigTimeIndependent`, {
        method: "POST",
        ...options,
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
          text: "set form time independent",
          params: {
            form: variables.form.name,
          },
        };
      },
    }
  );
};
