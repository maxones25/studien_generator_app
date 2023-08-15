import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormScheduleFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormSchedulesKey } from "..";

export const useUpdateFormSchedule = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormScheduleFormData, number>(
    ({ body: { id, ...body }, ...options }) =>
      apiRequest(`/studies/${studyId}/schedules/${id}`, {
        method: "PUT",
        body,
        ...options,
      }),
    {
      onSuccess: ({ variables, queryClient }) => {
        queryClient.invalidateQueries(
          getGetFormSchedulesKey({
            studyId: studyId!,
            formId: variables.configId,
          })
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
