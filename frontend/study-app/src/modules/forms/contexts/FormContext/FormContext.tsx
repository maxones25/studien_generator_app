import { useGetForm } from "@modules/forms/hooks";
import { FormData } from "@modules/forms/types";
import { createContext, FC, ReactNode, useContext } from "react";
import { useFormIdContext } from "..";
import { UseReadRequestResult } from "@modules/core/hooks";

interface FormContextValue {
  form?: UseReadRequestResult<FormData>
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextValue | undefined>(
  undefined
);

const useFormContextValue = () => {
  const { formId } = useFormIdContext();
  let form = undefined;
  if (formId !== undefined)
    form = useGetForm({formId})

  return {
    form,
  }
};

export const FormProvider: FC<FormProviderProps> = ({
  children,
}) => {
  const value = useFormContextValue();

  return (
    <FormContext.Provider value={value}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context)
    throw new Error("FormContext must be inside a FormProvider");

  return context;
};
