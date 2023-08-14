import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormScheduleFormData } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormSchedulesKey } from "..";

export const useCreateFormSchedule = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormScheduleFormData, string>(
    (options) =>
      apiRequest(`/studies/${studyId}/schedules`, {
        method: "POST",
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
