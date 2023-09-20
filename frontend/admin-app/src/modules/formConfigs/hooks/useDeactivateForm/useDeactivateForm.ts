import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useDeactivateForm = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<FormConfig, unknown>(
    ({ body: { id: configId }, ...options }) =>
      apiRequest(`/groups/deactivateFormConfig`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          configId,
        },
      }),
    {
      onSuccess({ variables, queryClient }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId, groupId })
        );
        return {
          text: "deactivate form",
          params: {
            form: variables.form.name,
          },
        };
      },
    }
  );
};
