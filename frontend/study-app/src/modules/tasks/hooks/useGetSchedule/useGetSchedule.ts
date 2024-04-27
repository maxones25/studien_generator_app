import { CalendarListItem } from "@modules/calendar/types";
import { sortCalendarItems } from "@modules/calendar/utils";
import { useDateContext } from "@modules/date/contexts";
import { useGetAppointments, useGetTasks } from "..";

export interface UseGetScheduleOptions {}

export interface UseGetScheduleResult {
    dates?: CalendarListItem[];
    isLoading: boolean;
    isError: boolean
}

export const useGetSchedule = () : UseGetScheduleResult => {
    const { date } = useDateContext();
    const tasks = useGetTasks();
    const appointments = useGetAppointments();
  
    const isLoading = tasks.isLoading || appointments.isLoading;
    const isError = tasks.isError || appointments.isError;
    const tasksData = tasks.data?.filter((data) => date.isSame(data.scheduledAt, 'day') && !data.deletedAt);
    const appointmentsData = appointments.data?.filter((data) => date.isSame(data.start, 'day') && !data.deletedAt);

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