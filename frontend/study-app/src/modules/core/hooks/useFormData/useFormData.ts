import { useState } from "react";

export interface UseFormDataResult<TFormData extends FormData> {
  set: (formData: TFormData) => void;
  reset: () => void;
  handleSet: (formData: TFormData) => () => void;
  data: TFormData | undefined;
  hasData: boolean;
  isNew: boolean;
}

export interface UseFormDataOptions {}

export interface FormData {
  id?: string;
}

export const useFormData = <TFormData extends FormData>(
  defaultData: TFormData | undefined = undefined
): UseFormDataResult<TFormData> => {
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
  const isNew = data?.id === undefined;

  return {
    set,
    reset,
    handleSet,
    data,
    hasData,
    isNew,
  };
};
