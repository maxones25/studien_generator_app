import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { FormSchedule } from "@modules/groups/types";
import { useStudyId } from "@modules/navigation/hooks";

export interface UseGetFormSchedulesOptions {}

export const getGetFormSchedulesKey = (deps: {
  studyId: string;
  formId: string;
}) => ["getFormSchedules", deps];

export const useGetFormSchedules = (formId: string, enabled = true) => {
  const studyId = useStudyId();

  return useReadRequest<FormSchedule[]>(
    getGetFormSchedulesKey({ studyId: studyId!, formId: formId! }),
    (options) =>
      apiRequest(`/studies/${studyId}/schedules`, {
        ...options,
        params: {
          formId,
        },
      }), {
        enabled
      }
  )
};
