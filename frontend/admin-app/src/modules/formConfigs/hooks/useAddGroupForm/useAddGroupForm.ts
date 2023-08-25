import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfigFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey, getGetNonGroupFormsKey } from "..";

export const useAddGroupForm = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<
    FormConfigFormData,
    {
      id: string;
      form: { id: string; name: string };
      group: { id: string; name: string };
    }
  >(
    ({ body: { formId, groupId }, ...options }) =>
      apiRequest(`/forms/addToGroup`, {
        ...options,
        method: "POST",
        params: {
          studyId,
          formId,
          groupId,
        },
      }),
    {
      onSuccess: ({ queryClient, data: { group, form } }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({
            groupId: group.id,
            studyId,
          })
        );
        queryClient.invalidateQueries(
          getGetNonGroupFormsKey({
            groupId: group.id,
            studyId,
          })
        );
        return {
          text: "record added to record",
          params: {
            addedRecord: "form",
            addedName: form.name,
            record: "group",
            name: group.name,
          },
        };
      },
    }
  );
};
