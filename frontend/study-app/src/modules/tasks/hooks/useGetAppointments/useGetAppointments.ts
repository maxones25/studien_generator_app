import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Appointment } from "@modules/tasks/types";

export interface UseGetAppointmentsOptions {}

export const getGetAppointmentsKey = () => ["getAppointments"];

export const useGetAppointments = () => {
  return useReadRequest<Appointment[]>(getGetAppointmentsKey(), (options) =>
    apiRequest(`/appointments`, { ...options })
  );
}