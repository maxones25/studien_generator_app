import { Appointment } from "@modules/appointments/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";

export const getGetAppointmentsKey = (deps: {
  studyId: string;
  participantId: string;
}) => ["getAppointments", deps];

export const useGetAppointments = () => {
  const studyId = useStudyId()!;
  const participantId = useParticipantId()!;
  return useReadRequest<Appointment[]>(
    getGetAppointmentsKey({ studyId, participantId }),
    (options) =>
      apiRequest(`/participants/appointments`, {
        ...options,
        params: { studyId, participantId },
      })
  );
};
