import { CalendarDate } from "@modules/calendar/types";
import { getDateFromItem, groupByDate } from "@modules/calendar/utils";
import { useGetAppointments, useGetTasks } from "@modules/tasks/hooks";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface CalendarContextValue {
  showAppointments: boolean;
  showTasks: boolean;
  setShowAppointments: (value: boolean) => void;
  setShowTasks: (value: boolean) => void;
  dates?: CalendarDate[];
  isLoading: boolean;
}

interface CalendarProviderProps {
  children: ReactNode;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

const useCalendarContextValue = () => {
  const [showAppointments, setShowAppointments] = useState(true);
  const [showTasks, setShowTasks] = useState(true);
  const tasks = useGetTasks();
  const appointments = useGetAppointments();

  const isLoading = tasks.isLoading && tasks.isLoading;
  const tasksData = showTasks ? tasks.data : [];
  const appointmentsData = showAppointments ? appointments.data : [];

  let dates: CalendarDate[] | undefined;
    
  if (tasksData && appointmentsData) {
    const calendarEntries = [...tasksData, ...appointmentsData];
    const sortedEntries = calendarEntries.sort((a, b) => {
      const aTime = getDateFromItem(a).getTime();
      const bTime = getDateFromItem(b).getTime();
      return aTime - bTime;
    });
    dates = groupByDate(sortedEntries);
  }
  return {
    showAppointments,
    showTasks,
    setShowAppointments,
    setShowTasks,
    dates,
    isLoading,
  }
};

export const CalendarProvider: FC<CalendarProviderProps> = ({
  children,
}) => {
  const value = useCalendarContextValue();

  return (
    <CalendarContext.Provider value={value}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);

  if (!context)
    throw new Error("CalendarContext must be inside a CalendarProvider");

  return context;
};
