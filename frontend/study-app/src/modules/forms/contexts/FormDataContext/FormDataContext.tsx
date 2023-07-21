import { createContext, FC, ReactNode, useContext, useState } from "react";
import { FormPageData, Record } from "@modules/forms/types";
import { useFormContext, useFormIdContext } from "..";
import { useSaveForm } from "@modules/forms/hooks";

interface FormDataContextValue {
  isLastPage: boolean;
  handleSubmit: (data: Object) => void;
  currentPage?: FormPageData
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
  const saveForm = useSaveForm();

  const handleSubmit = (newData: Object) => {
    if (isLastPage) {
      save(newData);
      resetForm();
      return;
    }
    addData(newData);
    setPageNumber(pageNumber + 1);
  }

  const save = (newData: Object) => {
    const fields: Object = {...data, ...newData};
    const fieldsArray = Object.entries(fields);
    const record: Record = {
      taskId: taskId,
      createdAt: new Date(),
      formId: formId!,
      fields: fieldsArray.map((value) => {return {entityFieldId: value[0], value: value[1]}}),
    } ;
    console.log(record);
    saveForm.mutateAsync(record);
  }

  const addData = (newData: Object) => {
    setData({...data, ...newData});
  }

  const isLastPage = form.data?.pages.length === pageNumber + 1;
  const currentPage = form.data?.pages[pageNumber];

  return {
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
