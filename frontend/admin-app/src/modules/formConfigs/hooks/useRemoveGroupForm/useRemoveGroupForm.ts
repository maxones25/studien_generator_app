import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormConfig } from "@modules/forms/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey, getGetNonGroupFormsKey } from "..";

export const useRemoveGroupForm = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<FormConfig, { group: { id: string; name: string } }>(
    ({ body: { id: configId }, ...options }) =>
      apiRequest(`/forms/removeFromGroup`, {
        ...options,
        method: "POST",
        params: { studyId, configId },
      }),
    {
      onSuccess({ queryClient, variables: config, data: { group } }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId, groupId: group.id })
        );
        queryClient.invalidateQueries(
          getGetNonGroupFormsKey({
            studyId,
            groupId: group.id,
          })
        );
        return {
          text: "record removed to record",
          params: {
            removedRecord: "form",
            removedName: config.form.name,
            record: "group",
            name: group.name,
          },
        };
      },
    }
  );
};
