import { AppointmentFormData } from "@modules/appointments/types";
import { useWriteRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useGroupId, useStudyId } from "@modules/navigation/hooks";
import { getGetAppointmentsKey } from "..";

export const useCreateAppointment = () => {
  const studyId = useStudyId()!;
  const groupId = useGroupId()!;
  return useWriteRequest<AppointmentFormData, string>(
    (options) =>
      apiRequest(`/groups/createAppointment`, {
        ...options,
        method: "POST",
        params: { studyId, groupId },
      }),
    {
      onSuccess({ queryClient, variables: appointment }) {
        queryClient.invalidateQueries(
          getGetAppointmentsKey({ studyId, groupId })
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
