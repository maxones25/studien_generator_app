import { useState } from "react";
export interface UseCounterOptions {}

export interface UseCounterResult {
  value: number;
  increase: () => void;
  decrease: () => void;
}

export const useCounter = (defaultValue = 0): UseCounterResult => {
  const [value, set] = useState<number>(defaultValue);

  const increase = () => {
    set(() => value + 1);
  };

  const decrease = () => {
    set(() => value - 1);
  };

  return {
    value,
    increase,
    decrease,
  };
};
