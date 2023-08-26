import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { Schedule } from "@modules/formConfigs/types";
import { getGetGroupFormsKey } from "..";

export const useDeleteFormSchedule = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<Schedule, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/schedules/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess({ queryClient, variables: schedule }) {
        queryClient.invalidateQueries(
          getGetGroupFormsKey({
            studyId,
            groupId,
          })
        );
        return {
          text: "record deleted",
          params: {
            record: "schedule",
            name: schedule.type,
          },
        };
      },
    }
  );
};
