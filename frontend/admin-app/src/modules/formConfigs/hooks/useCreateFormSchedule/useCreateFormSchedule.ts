import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { ScheduleFormData } from "@modules/formConfigs/types";
import { getGetGroupFormsKey } from "..";

export const useCreateFormSchedule = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;

  return useWriteRequest<ScheduleFormData, string>(
    ({ body: { configId, ...body }, ...options }) =>
      apiRequest(`/groups/addSchedule`, {
        ...options,
        method: "POST",
        params: { studyId, configId },
        body,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({
            studyId,
            groupId,
          })
        );
        return {
          text: "record created",
          params: {
            record: "schedule",
            name: variables.type,
          },
        };
      },
    }
  );
};
