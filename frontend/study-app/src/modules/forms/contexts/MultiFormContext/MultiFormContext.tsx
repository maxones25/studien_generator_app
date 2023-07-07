import { useGetForm } from "@modules/forms/hooks";
import { FormData, MultiFormData } from "@modules/forms/types";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface MultiFormContextValue {
  handleSubmit: (data: Object) => void;
  multiForm?: MultiFormData;
  resetForm: () => void;
  hasForm: boolean;
  getMultiForm: (formId: string) => void;
  getCurrentPage: () => FormData | undefined;
  isLastPage: boolean;
}

interface MultiFormProviderProps {
  children: ReactNode;
}

const MultiFormContext = createContext<MultiFormContextValue | undefined>(
  undefined
);

const useMultiFormContextValue = () => {
  const [data, setData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const [multiForm, setMultiForm] = useState<MultiFormData|undefined>()
  
  const getMultiForm = (formId: string) => {
    setMultiForm(useGetForm({formId}).data);
  }

  const handleSubmit = (data: Object) => {
    addData(data);
    if (isLastPage) {
      saveForm();
      setMultiForm(undefined);
      return;
    }
    setPageNumber(pageNumber + 1);
  }

  const saveForm = () => {
    console.log(data);
  }

  const addData = (newData: Object) => {
    setData({...data, ...newData});
  }

  const resetForm = () => {
    setMultiForm(undefined);
  }

  const getCurrentPage = () => multiForm?.pages[pageNumber];

  const hasForm = multiForm !== undefined;
  const isLastPage = multiForm?.pages.length === pageNumber + 1;

  return {
    handleSubmit,
    multiForm,
    resetForm,
    hasForm,
    getMultiForm,
    getCurrentPage,
    isLastPage,
  }
};

export const MultiFormProvider: FC<MultiFormProviderProps> = ({
  children,
}) => {
  const value = useMultiFormContextValue();

  return (
    <MultiFormContext.Provider value={value}>
      {children}
    </MultiFormContext.Provider>
  );
};

export const useMultiFormContext = () => {
  const context = useContext(MultiFormContext);

  if (!context)
    throw new Error("MultiFormContext must be inside a MultiFormProvider");

  return context;
};
