import { Component } from "@modules/components/types";
import { FormEntityField } from "@modules/formEntities/types";
import { FormPage } from "@modules/formPages/types";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
  useMemo,
} from "react";

interface FormContextValue {
  page?: FormPage;
  setPage: (page: FormPage) => void;
  components?: Component[];
  componentOptions?: Component[];
  formPages?: FormPage[];
  selected: {
    component?: Component;
    setComponent: (component: Component) => void;
    unsetComponent: () => void;
    formFields: FormEntityField[];
    toggleField: (field: FormEntityField) => void;
  };
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContextValue = ({
  components,
  formPages,
}: {
  components: Component[];
  formPages: FormPage[];
}) => {
  const [component, setComponent] = useState<Component | undefined>(undefined);
  const [formFields, setFormFields] = useState<FormEntityField[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const setPage = (page: FormPage) => {
    setPageNumber(page.number);
  };

  const toggleField = (field: FormEntityField) => {
    const nextFormFields = formFields.filter(
      (formField) => formField.id !== field.id
    );
    if (nextFormFields.length === formFields.length) {
      setFormFields([...nextFormFields, field]);
    } else {
      setFormFields([...nextFormFields]);
    }
  };

  const unsetComponent = () => {
    setComponent(undefined);
  };

  const page = formPages[pageNumber];

  const componentOptions = useMemo(() => {
    return components.filter((component) => {
      if (component.entityFields.length !== formFields.length) return false;
      const store: string[] = [];
      for (const fieldType of component.entityFields) {
        const selectedField = formFields.find(
          (sf) => sf.type === fieldType && !store.includes(sf.id)
        );
        if (selectedField) {
          store.push(selectedField.id);
        }
      }
      return store.length === component.entityFields.length;
    });
  }, [components, formFields]);

  return {
    page,
    setPage,
    componentOptions,
    components,
    formPages,
    selected: {
      component,
      setComponent,
      unsetComponent,
      formFields,
      toggleField,
    },
  };
};

interface FormProviderProps {
  children: ReactNode;
  components: Component[];
  formPages: FormPage[];
}

export const FormProvider: FC<FormProviderProps> = ({
  children,
  components,
  formPages,
}) => {
  const value = useFormContextValue({ formPages, components });

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

export const useFormContext = () => {
  const context = useContext(FormContext);

  if (!context) throw new Error("FormContext must be inside a FormProvider");

  return context;
};
