import { Appointment } from "@modules/appointments/types";
import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { useStudyId } from "@modules/navigation/hooks";

export const getGetAppointmentsKey = (deps: { studyId: string }) => [
  "getAppointments",
  deps,
];

export const useGetAppointments = () => {
  const studyId = useStudyId()!;
  return useReadRequest<Appointment[]>(
    getGetAppointmentsKey({ studyId }),
    (options) =>
      apiRequest(`/studies/appointments`, { ...options, params: { studyId } })
  );
};
