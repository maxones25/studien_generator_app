import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfigFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useAddGroupForm = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormConfigFormData, string>(
    ({ body: { formId, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/forms/${formId}/configurations`, {
        method: "POST",
        body,
        ...options,
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({
            groupId: variables.groupId!,
            studyId: studyId!,
          })
        );
        return {
          text: "record added",
          params: {
            record: "form",
            mainRecord: "group",
            name: variables.formId,
          },
        };
      },
    }
  );
};
