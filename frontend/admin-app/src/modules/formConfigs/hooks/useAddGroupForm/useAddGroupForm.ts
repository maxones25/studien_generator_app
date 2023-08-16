import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfigFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useAddGroupForm = () => {
  const studyId = useStudyId();
  return useWriteRequest<
    FormConfigFormData,
    {
      id: string;
      form: { id: string; name: string };
      group: { id: string; name: string };
    }
  >(
    ({ body: { formId, groupId, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/addFormToGroup`, {
        method: "POST",
        body,
        ...options,
        params: {
          formId,
          groupId,
        },
      }),
    {
      onSuccess: ({ queryClient, variables, data }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({
            groupId: variables.groupId!,
            studyId: studyId!,
          })
        );
        return {
          text: "record added to record",
          params: {
            addedRecord: "form",
            addedName: data.form.name,
            record: "group",
            name: data.group.name,
          },
        };
      },
    }
  );
};
