import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useDeactivateForm = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();
  return useWriteRequest<FormConfig, unknown>(
    ({ body: { id: formConfigId }, ...options }) =>
      apiRequest(`/studies/${studyId}/deactivateForm`, {
        method: "POST",
        ...options,
        params: {
          formConfigId,
        },
      }),
    {
      onSuccess({ variables, queryClient }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId: studyId!, groupId: groupId! })
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
