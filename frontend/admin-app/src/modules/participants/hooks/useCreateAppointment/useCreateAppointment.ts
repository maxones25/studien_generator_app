import { AppointmentFormData } from "@modules/appointments/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useParticipantId, useStudyId } from "@modules/navigation/hooks";
import { getGetAppointmentsKey } from "..";

export const useCreateAppointment = () => {
  const studyId = useStudyId()!;
  const participantId = useParticipantId()!;

  return useWriteRequest<AppointmentFormData, string>(
    (options) =>
      apiRequest(`/participants/createAppointment`, {
        ...options,
        method: "POST",
        params: { studyId, participantId },
      }),
    {
      onSuccess({ queryClient, variables: appointment }) {
        queryClient.invalidateQueries(
          getGetAppointmentsKey({ studyId, participantId })
        );

        return {
          text: "record created",
          params: {
            record: "appointment",
            name: appointment.subject,
          },
        };
      },
    }
  );
};
