import { createContext, FC, ReactNode, useContext, useState } from "react";

interface CalendarContextValue {
  showAppointments: boolean;
  showTasks: boolean;
  setShowAppointments: (value: boolean) => void;
  setShowTasks: (value: boolean) => void
}

interface CalendarProviderProps {
  children: ReactNode;
}

const CalendarContext = createContext<CalendarContextValue | undefined>(
  undefined
);

const useCalendarContextValue = () => {
  const [showAppointments, setShowAppointments] = useState(true);
  const [showTasks, setShowTasks] = useState(false);

  return {
    showAppointments,
    showTasks,
    setShowAppointments,
    setShowTasks,
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
