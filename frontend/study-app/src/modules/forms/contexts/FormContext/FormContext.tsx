import { useGetForm } from "@modules/forms/hooks";
import { MultiFormData } from "@modules/forms/types";
import { createContext, FC, ReactNode, useContext } from "react";
import { useFormIdContext } from "..";

interface FormContextValue {
  form?: MultiFormData
}

interface FormProviderProps {
  children: ReactNode;
}

const FormContext = createContext<FormContextValue | undefined>(
  undefined
);

const useFormContextValue = () => {
  const { formId = '' } = useFormIdContext();
  const form = useGetForm({formId}).data

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
