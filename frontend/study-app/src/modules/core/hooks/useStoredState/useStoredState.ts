import { useState } from "react";

export interface UseStoredStateOptions<T> {
  storage?: Storage;
  defaultValue?: T;
}

export type UseStoredStateResult<T> = [value: T, setter: (value: T) => void];

export function useStoredState<T>(
  key: string,
  config?: UseStoredStateOptions<T>
): UseStoredStateResult<T> {
  const { defaultValue = undefined, storage = localStorage } = config || {};

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.log(error);
      return defaultValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        typeof value === "object" && !Array.isArray(value)
          ? { ...storedValue, ...value }
          : value;
      storage.setItem(key, JSON.stringify(valueToStore));
      setStoredValue(valueToStore);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
