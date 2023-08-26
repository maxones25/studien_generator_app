import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { ScheduleFormData } from "@modules/formConfigs/types";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetGroupFormsKey } from "..";

export const useUpdateFormSchedule = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<ScheduleFormData, number>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/forms/updateSchedule`, {
        method: "PUT",
        body,
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({ studyId, groupId })
        );
        return {
          text: "record updated",
          params: {
            record: "schedule",
            name: variables.type,
          },
        };
      },
    }
  );
};
