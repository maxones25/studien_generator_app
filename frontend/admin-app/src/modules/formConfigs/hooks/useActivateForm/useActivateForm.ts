import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useActivateForm = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<FormConfig, unknown>(
    ({ body: { id: configId }, ...options }) =>
      apiRequest(`/groups/activateFormConfig`, {
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
          text: "activate form",
          params: {
            form: variables.form.name,
          },
        };
      },
    }
  );
};
