import { CalendarListItem } from "@modules/calendar/types";
import { useGetAppointmentsByDate, useGetTasksByDate } from "..";
import { sortCalendarItems } from "@modules/calendar/utils";
import { useDateContext } from "@modules/date/contexts";

export interface UseGetScheduleOptions {}

export interface UseGetScheduleResult {
    dates?: CalendarListItem[];
    isLoading: boolean;
    isError: boolean
}

export const useGetSchedule = () : UseGetScheduleResult => {
    const { date } = useDateContext();
    const tasks = useGetTasksByDate({ date });
    const appointments = useGetAppointmentsByDate({ date });
  
    const isLoading = tasks.isLoading || appointments.isLoading;
    const isError = tasks.isError || appointments.isError;
    const tasksData = tasks.data;
    const appointmentsData = appointments.data;

    let dates: CalendarListItem[] | undefined;
    
    if (tasksData && appointmentsData) {
      const calendarEntries = [...tasksData, ...appointmentsData];
      dates = sortCalendarItems(calendarEntries);
    }

    return {
        dates,
        isLoading,
        isError,
    }
}