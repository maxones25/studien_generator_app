import { AppointmentFormData } from "@modules/appointments/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetAppointmentsKey } from "..";

export const useCreateAppointment = () => {
  const studyId = useStudyId()!;
  return useWriteRequest<AppointmentFormData, string>(
    (options) =>
      apiRequest(`/studies/createAppointment`, {
        ...options,
        method: "POST",
        params: { studyId },
      }),
    {
      onSuccess({ queryClient, variables: appointment }) {
        queryClient.invalidateQueries(getGetAppointmentsKey({ studyId }));

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
