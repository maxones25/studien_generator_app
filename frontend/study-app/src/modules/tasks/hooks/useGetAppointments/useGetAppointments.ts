import { useReadRequest } from "@modules/core/hooks";
// import { apiRequest } from "@modules/core/utils";
import { Appointment } from "@modules/tasks/types";
import dayjs from "dayjs";

export interface UseGetAppointmentsOptions {}

export const getGetAppointmentsKey = () => ["getAppointments"];

export const useGetAppointments = () => {
  return useReadRequest<Appointment[]>(getGetAppointmentsKey(), (_options) =>
    // apiRequest(`/appointments`, { ...options })
    new Promise((resolve) => {
      resolve(
        [
          { id: '1', start: new Date('2023-01-10T12:00:00'), name: 'Meeting mit Team A' },
          { id: '2', start: new Date('2023-01-11T14:30:00'), name: 'Produktpräsentation' },
          { id: '3', start: new Date('2023-01-12T10:15:00'), name: 'Anruf mit Klient X' },
          { id: '4', start: new Date('2023-01-13T16:45:00'), name: 'Workshop für Neuanfänger' },
          { id: '5', start: new Date('2023-01-14T09:00:00'), name: 'Planungsbesprechung' },
          { id: '6', start: dayjs('2023-02-05T09:00:00').toDate(), name: 'Frühstückstreffen mit Team B' },
    { id: '7', start: dayjs('2023-02-05T14:30:00').toDate(), name: 'Projektupdate' },
    { id: '8', start: dayjs('2023-02-06T10:00:00').toDate(), name: 'Technische Besprechung' },
    { id: '9', start: dayjs('2023-02-07T16:00:00').toDate(), name: 'Review Meeting' },
    { id: '10', start: dayjs('2023-02-08T09:30:00').toDate(), name: 'Strategieplanung' },
      ]
      )
    })
  );
}