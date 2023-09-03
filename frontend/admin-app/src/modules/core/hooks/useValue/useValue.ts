import { useState } from "react";

export interface UseValueResult<T> {
  value: T;

  isSet: boolean;
  set: (value: T) => void;
  handleSet: (value: T) => () => void;
  reset: () => void;
}

export const useValue = <T>(defaultValue: T): UseValueResult<T> => {
  const [value, setValue] = useState<T>(defaultValue);

  const set = (value: T) => {
    setValue(value);
  };

  const handleSet = (value: T) => () => {
    set(value);
  };

  const reset = () => {
    setValue(defaultValue);
  };

  const isSet = value !== defaultValue;

  return {
    value,
    isSet,
    set,
    handleSet,
    reset,
  };
};
