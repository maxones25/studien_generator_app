import { createContext, FC, ReactNode, useContext, useState } from "react";
import { FormPageData, Record, RecordField } from "@modules/forms/types";
import { useFormContext, useFormIdContext } from "..";
import { useSaveForm } from "@modules/forms/hooks";
import { useDateContext } from "@modules/date/contexts";
import { v4 as uuid } from 'uuid';

interface FormDataContextValue {
  isLastPage: boolean;
  handleSubmit: (data: Object) => void;
  currentPage?: FormPageData;
  isLoading: boolean;
}

interface FormDataProviderProps {
  children: ReactNode;
}

const FormDataContext = createContext<FormDataContextValue | undefined>(
  undefined
);

const useFormDataContextValue = () => {
  const { resetForm, taskId, name } = useFormIdContext();
  const { form } = useFormContext();
  const { date: date } = useDateContext();
  const [data, setData] = useState({});
  const [pageNumber, setPageNumber] = useState(0);
  const saveForm = useSaveForm();

  const handleSubmit = async (newData: Object) => {
    if (isLastPage) {
      await save(newData);
      resetForm();
      return;
    }
    addData(newData);
    setPageNumber(pageNumber + 1);
  }

  const save = async (newData: Object) => {
    const components: Object = {...data, ...newData};
    const componentsArray = Object.entries(components);
    let entityFields: RecordField[] = [];
    componentsArray.forEach((value) => {
      Object.entries(value[1]).forEach((value) => {
        entityFields.push({entityFieldId: value[0], value: value[1]})
      })
    })
    const record: Record = {
      id: uuid(),
      taskId: taskId,
      createdAt: date.toDate(),
      formId: form!.data!.id,
      fields: entityFields,
      name: name!,
    } ;
    console.log(record);
    await saveForm.mutateAsync(record);
  }

  const addData = (newData: Object) => {
    setData({...data, ...newData});
  }

  const isLastPage = form?.data?.pages.length === pageNumber + 1;
  const currentPage = form?.data?.pages[pageNumber];

  return {
    isLoading: saveForm.isLoading,
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