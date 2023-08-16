import { createContext, FC, ReactNode, useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/de';
import { useStoredState } from "@modules/core/hooks";


interface DateContextValue {
  date: Dayjs;
  set: (value: Dayjs) => void;
  increase: () => void;
  decrease: () => void;
  locale: string
  setLocale: (value: string) => void;
  isFuture: boolean;
}

interface DateProviderProps {
  children: ReactNode;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);

const useDateContextValue = () => {
  const [timeStemp, setTimeStemp] = useStoredState<string>("date", {
    storage: sessionStorage,
    defaultValue: dayjs().toString(),
  });
  const [locale, setLocale] = useState('de');
  const date = dayjs(timeStemp);
  dayjs.locale(locale)

  const set = (date: Dayjs) => {
    setTimeStemp(date.toString());
  }

  const increase = () => {
    set(date.add(1, 'day'));
  };

  const decrease = () => {
    set(date.subtract(1, 'day'));
  };

  const isFuture = date.isAfter(dayjs(), 'day')

  return {
    date,
    set,
    increase,
    decrease,
    locale,
    setLocale,
    isFuture
  };
};

export const DateProvider: FC<DateProviderProps> = ({ children }) => {
  const value = useDateContextValue();

  return <DateContext.Provider value={value}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={value.locale}>
      {children}
    </LocalizationProvider>
  </DateContext.Provider>;
};

export const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) throw new Error("DateContext must be inside a DateProvider");

  return context;
};
