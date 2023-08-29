import { useState } from "react";

export interface UseValueResult<T> {
  value: T;
  set: (value: T) => void;
  reset: () => void;
}

export const useValue = <T>(defaultValue: T): UseValueResult<T> => {
  const [value, setValue] = useState<T>(defaultValue);

  const set = (value: T) => {
    setValue(value);
  };

  const reset = () => {
    setValue(defaultValue);
  };

  return {
    value,
    set,
    reset,
  };
};
