import { Appointment } from "@modules/appointments/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";
import { getGetAppointmentsKey } from "..";

export const useDeleteAppointment = () => {
  const studyId = useStudyId()!;

  return useWriteRequest<Appointment, number>(
    ({ body: { id: appointmentId }, ...options }) =>
      apiRequest(`/studies/deleteAppointment`, {
        ...options,
        method: "POST",
        params: { appointmentId, studyId },
      }),
    {
      onSuccess: ({ queryClient, variables }) => {
        queryClient.invalidateQueries(getGetAppointmentsKey({studyId}));
        return {
          text: "record deleted",
          params: {
            name: variables.subject,
            record: "appointment",
          },
        };
      },
    }
  );
}