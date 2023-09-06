import { Appointment } from "@modules/appointments/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";

export const getGetAppointmentsKey = (deps: {
  studyId: string;
  groupId: string;
}) => ["getAppointments", deps];

export const useGetAppointments = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;

  return useReadRequest<Appointment[]>(
    getGetAppointmentsKey({ studyId, groupId }),
    (options) =>
      apiRequest(`/groups/appointments`, {
        ...options,
        params: { studyId, groupId },
      })
  );
};
