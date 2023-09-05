import { useReadRequest } from "@modules/core/hooks";
import { apiRequest } from "@modules/core/utils";
import { Appointment } from "@modules/tasks/types";
import { Dayjs } from "dayjs";

export interface UseGetAppointmentsByDatesOptions {
  date: Dayjs;
}

export const getGetAppointmentsByDatesKey = (date: Dayjs) => ["getAppointmentsByDate", date.toISOString()];

export const useGetAppointmentsByDate = (options : UseGetAppointmentsByDatesOptions) => {
  const date = options.date;
  return useReadRequest<Appointment[]>(getGetAppointmentsByDatesKey(date), (options) =>
    apiRequest(`/appointments}`, {params: {
      date: encodeURIComponent(date.toISOString())
    }, ...options }),
    {
      keepPreviousData: true
    }
  );
}