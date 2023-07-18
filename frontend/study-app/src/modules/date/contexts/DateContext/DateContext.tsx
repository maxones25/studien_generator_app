import { createContext, FC, ReactNode, useContext, useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/de';


interface DateContextValue {
  value: Dayjs;
  set: (value: Dayjs) => void;
  increase: () => void;
  decrease: () => void;
  locale: string
  setLocale: (value: string) => void;
}

interface DateProviderProps {
  children: ReactNode;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);

const useDateContextValue = () => {
  const [value, set] = useState(dayjs());
  const [locale, setLocale] = useState('de')

  const increase = () => {
    set(value.add(1, 'day'));
  };

  const decrease = () => {
    set(value.subtract(1, 'day'));
  };

  return {
    value: value.locale(locale),
    set,
    increase,
    decrease,
    locale,
    setLocale,
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
