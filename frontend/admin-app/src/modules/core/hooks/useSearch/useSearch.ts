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
  const [{ isActive, value }, setData] = useState<{
    isActive: boolean;
    value?: string;
  }>({ isActive: false });

  const start = () => {
    setData({ isActive: true, value });
  };

  const stop = () => {
    setData({ isActive: false, value: undefined });
  };

  const toggle = () => {
    setData(() =>
      isActive
        ? {
            isActive: false,
            value: undefined,
          }
        : {
            isActive: true,
            value,
          }
    );
  };

  const set = (value: string) => {
    setData({ isActive, value });
  };

  const reset = () => {
    setData({ isActive, value: undefined });
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
