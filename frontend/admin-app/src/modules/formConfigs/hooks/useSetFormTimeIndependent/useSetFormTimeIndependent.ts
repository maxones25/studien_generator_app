import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useSetFormTimeIndependent = () => {
  const studyId = useStudyId();
  const groupId = useGroupId();
  return useWriteRequest<FormConfig, boolean>(
    ({ body: { id: formConfigId }, ...options }) =>
      apiRequest(`/studies/${studyId}/setFormTimeIndependent`, {
        method: "POST",
        ...options,
        params: {
          formConfigId,
        },
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId: studyId!, groupId: groupId! })
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
