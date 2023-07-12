import { createContext, FC, ReactNode, useContext, useState } from "react";
import { FormData } from "@modules/forms/types";
import { useFormContext, useFormIdContext } from "..";

interface FormDataContextValue {
  title: string,
  isLastPage: boolean;
  handleSubmit: (data: Object) => void;
  currentPage?: FormData
}

interface FormDataProviderProps {
  children: ReactNode;
}

const FormDataContext = createContext<FormDataContextValue | undefined>(
  undefined
);

const useFormDataContextValue = () => {
  const { resetForm, formId, taskId } = useFormIdContext();
  const { form } = useFormContext();
  const [data, setData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);

  const handleSubmit = (newData: Object) => {
    if (isLastPage) {
      saveForm(newData);
      resetForm();
      return;
    }
    addData(newData);
    setPageNumber(pageNumber + 1);
  }

  const saveForm = (newData: Object) => {
    console.log({
      task: {
        id: taskId,
        completedAt: Date.now(),
      },
      form: {
        id: formId,
        fields: {...data, ...newData}}
    });
  }

  const addData = (newData: Object) => {
    setData({...data, ...newData});
  }

  const isLastPage = form?.pages.length === pageNumber + 1;
  const currentPage = form?.pages[pageNumber];

  return {
    title: form?.title ?? '',
    isLastPage,
    handleSubmit,
    currentPage
  }
};

export const FormDataProvider: FC<FormDataProviderProps> = ({
  children,
  }) => {
  const value = useFormDataContextValue();

  return (
    <FormDataContext.Provider value={value}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormDataContext = () => {
  const context = useContext(FormDataContext);

  if (!context)
    throw new Error("FormDataContext must be inside a FormDataProvider");

  return context;
};
