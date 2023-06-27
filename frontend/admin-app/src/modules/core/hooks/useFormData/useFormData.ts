import { useState } from "react";

export interface UseFormDataOptions {}

interface FormData {
  id?: string;
}

export const useFormData = <TFormData extends FormData>(
  defaultData: TFormData | undefined = undefined
) => {
  const [data, setData] = useState<TFormData | undefined>(defaultData);

  const set = (formData: TFormData) => {
    setData(formData);
  };

  const reset = () => {
    setData(undefined);
  };

  const handleSet = (formData: TFormData) => () => {
    set(formData);
  };

  const hasData = data !== undefined;
  const isNew = data?.id !== undefined;

  return {
    set,
    reset,
    handleSet,
    data,
    hasData,
    isNew,
  };
};
