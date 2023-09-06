import { Appointment } from "@modules/appointments/types";
import { formatDateTime } from "@modules/date/utils";

export const formatTime = (appointment: Appointment) => {
  const { endDate, endTime, startDate, startTime } = appointment;

  const start = formatDateTime(new Date(startDate + "T" + startTime));
  const end = formatDateTime(new Date(endDate + "T" + endTime));

  return start + " - " + end;
};
