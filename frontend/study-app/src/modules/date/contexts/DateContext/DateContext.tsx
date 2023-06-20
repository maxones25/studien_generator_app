import { createContext, FC, ReactNode, useContext, useState } from "react";
import dateApi from "date-and-time";

interface DateContextValue {
  value: Date;
  set: (value: Date) => void;
  increase: () => void;
  decrease: () => void;
}

interface DateProviderProps {
  children: ReactNode;
}

const DateContext = createContext<DateContextValue | undefined>(undefined);

const useDateContextValue = () => {
  const [value, set] = useState(new Date());

  const increase = () => {
    set(dateApi.addDays(value, 1));
  };

  const decrease = () => {
    set(dateApi.addDays(value, -1));
  };

  return {
    value,
    set,
    increase,
    decrease,
  };
};

export const DateProvider: FC<DateProviderProps> = ({ children }) => {
  const value = useDateContextValue();

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>;
};

export const useDateContext = () => {
  const context = useContext(DateContext);

  if (!context) throw new Error("DateContext must be inside a DateProvider");

  return context;
};
