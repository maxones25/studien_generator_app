import { createContext, FC, ReactNode, useContext, useState } from "react";

interface FormIdContextValue {
  formId?: string;
  taskId?: string;
  name?: string;
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
  const [taskId, setTaskId] = useState<string|undefined>();
  const [name, setName] = useState<string|undefined>();

  const setForm = (formId: string, name: string, taskId?: string) => {
    setFormId(formId);
    setTaskId(taskId);
    setName(name);
  }

  const resetForm = () => {
    setFormId(undefined);
    setTaskId(undefined);
    setName(undefined);
  }

  const hasFormId = formId !== undefined;

  return {
    formId,
    taskId,
    name,
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
