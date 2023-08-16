import { useState } from "react";

export interface UseSearchResult {
  isActive: boolean;
  value?: string;
  start: () => void;
  stop: () => void;
  toggle: () => void;
  set: (value: string) => void;
  reset: () => void;
}

export const useSearch = (): UseSearchResult => {
  const [isActive, setIsActive] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);

  const start = () => {
    setIsActive(true);
  };

  const stop = () => {
    setIsActive(true);
  };

  const toggle = () => {
    setIsActive(() => !isActive);
  };

  const set = (value: string) => {
    setValue(value);
  };

  const reset = () => {
    setValue(undefined);
  };

  return {
    isActive,
    value,
    start,
    stop,
    toggle,
    set,
    reset,
  };
};
