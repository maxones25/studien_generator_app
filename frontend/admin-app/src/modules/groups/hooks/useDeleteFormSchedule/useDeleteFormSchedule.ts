import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormSchedule } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetFormSchedulesKey } from "..";

export const useDeleteFormSchedule = () => {
  const studyId = useStudyId();
  return useWriteRequest<FormSchedule, number>(
    ({ body: { id }, ...options }) =>
      apiRequest(`/studies/${studyId}/schedules/${id}`, {
        method: "DELETE",
        ...options,
      }),
    {
      onSuccess({ queryClient, variables }) {
        queryClient.invalidateQueries(
          getGetFormSchedulesKey({
            studyId: studyId!,
            formId: variables.formId,
          })
        );
        return {
          text: "record deleted",
          params: {
            record: "schedule",
            name: variables.id,
          },
        };
      },
    }
  );
};
