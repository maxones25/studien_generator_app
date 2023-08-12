import { CalendarDate, CalendarEntry } from "@modules/calendar/types";
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
    const calendarEntries: CalendarEntry[] = [...tasksData, ...appointmentsData];
    const sortedEntries = calendarEntries.sort((a, b) => {
      return a.scheduledAt.getTime() - b.scheduledAt.getTime();
    });
    dates = groupByDate(sortedEntries);
  }

  function groupByDate(entries: CalendarEntry[]): CalendarDate[] {
    const grouped: { [dateStr: string]: CalendarEntry[] } = {};

    entries.forEach(entry => {
        const dateStr = entry.scheduledAt.toISOString().split('T')[0];  // z.B. "2023-01-10"
        if (!grouped[dateStr]) {
            grouped[dateStr] = [];
        }
        grouped[dateStr].push(entry);
    });

    return Object.entries(grouped).map(([dateStr, entries]) => ({
        date: new Date(dateStr),
        entries
    }));
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
