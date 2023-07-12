import { createContext, FC, ReactNode, useContext, useState } from "react";

interface FormIdContextValue {
  formId?: string;
  title?: string;
  setForm: (formId: string, title: string) => void;
  resetForm: () => void;
  hasFormId: boolean;
}


interface FormIdProviderProps {
  children: ReactNode;
}

const FormIdContext = createContext<FormIdContextValue | undefined>(
  undefined
);

const useFormIdContextValue = () => {
  const [formId, setFormId] = useState<string|undefined>();
  const [title, setTitle] = useState<string|undefined>();

  const setForm = (formId: string, title: string) => {
    setFormId(formId);
    setTitle(title);
  }

  const resetForm = () => {
    setFormId(undefined);
  }

  const hasFormId = formId !== undefined;

  return {
    formId,
    title,
    setForm,
    resetForm,
    hasFormId,
  }
};

export const FormIdProvider: FC<FormIdProviderProps> = ({
  children,
}) => {
  const value = useFormIdContextValue();

  return (
    <FormIdContext.Provider value={value}>
      {children}
    </FormIdContext.Provider>
  );
};

export const useFormIdContext = () => {
  const context = useContext(FormIdContext);

  if (!context)
    throw new Error("FormIdContext must be inside a FormIdProvider");

  return context;
};
