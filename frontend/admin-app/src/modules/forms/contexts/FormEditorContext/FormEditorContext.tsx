import { Component } from "@modules/components/types";
import { FormPage } from "@modules/formPages/types";
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer,
  Reducer,
} from "react";
import { formEditorReducer } from "./reducer/FormEditorReducer";
import { FormEditorState } from "./reducer/FormEditorState";
import { FormEditorAction } from "./reducer/FormEditorActions";
import { FormEntity } from "@modules/formEntities/types";
import {
  EnhancedFormEntity,
  useFormEntities,
  useComponents,
  useFormPages,
  EnhancedFormPage,
  UseComponentsResult,
} from "./hooks";

interface FormEditorProviderProps extends FormEditorContextValueOptions {
  children: ReactNode;
}

interface FormEditorContextValueOptions {
  pageId: string;

  components: Component[];
  formPages: FormPage[];
  formEntities: FormEntity[];
}

interface FormEditorContextValue {
  state: FormEditorState;
  dispatch: Dispatch<FormEditorAction>;
  allComponents: Component[];
  formPages: EnhancedFormPage[];
  components: UseComponentsResult;
  formEntities: EnhancedFormEntity[];
}

const FormEditorContext = createContext<FormEditorContextValue | undefined>(
  undefined
);

const useFormEditorContextValue = ({
  pageId,
  components,
  formPages,
  formEntities,
}: FormEditorContextValueOptions) => {
  const [state, dispatch] = useReducer<
    Reducer<FormEditorState, FormEditorAction>
  >(formEditorReducer, {
    formComponent: null,
    component: {
      data: null,
    },
    fields: [],
  });

  const enhancedFormPages = useFormPages(formPages, pageId);

  const enhancedFormEntities = useFormEntities(formEntities, state.fields);

  const enhancedComponents = useComponents(
    components,
    state.fields.map((field) => field.data)
  );

  return {
    state,
    dispatch,
    formPages: enhancedFormPages,
    allComponents: components,
    components: enhancedComponents,
    formEntities: enhancedFormEntities,
  };
};

export const FormEditorProvider: FC<FormEditorProviderProps> = ({
  children,
  pageId,
  components,
  formPages,
  formEntities,
}) => {
  const value = useFormEditorContextValue({
    pageId,
    components,
    formPages,
    formEntities,
  });

  return (
    <FormEditorContext.Provider value={value}>
      {children}
    </FormEditorContext.Provider>
  );
};

export const useFormEditorContext = () => {
  const context = useContext(FormEditorContext);

  if (!context)
    throw new Error("FormEditorContext must be inside a FormEditorProvider");

  return context;
};
