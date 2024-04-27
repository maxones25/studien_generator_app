import { Component } from "@modules/components/types";
import { useNavigationHelper } from "@modules/core/hooks";
import { FormComponent } from "@modules/formComponents/types";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";
import { FormPage } from "@modules/formPages/types";
import { useFormEditorContext } from "@modules/forms/contexts";

export interface UseFormEditorResult {
  page: {
    set: (page: FormPage) => void;
  };
  component: {
    isVisible: boolean;
    data: Component | null;
    isSelected: boolean;
    set: (component: Component) => void;
    clear: () => void;
  };
  formComponent: {
    data: FormComponent | null;
    isSelected: boolean;
    set: (formComponent: FormComponent) => void;
    reset: () => void;
  };
  selected: {
    fields: {
      clear: () => void;
      toggle: (entity: FormEntity, formField: FormEntityField) => void;
    };
  };
}

export const useFormEditor = (): UseFormEditorResult => {
  const {
    dispatch,
    state: { fields, component, formComponent },
  } = useFormEditorContext();
  const navigate = useNavigationHelper();

  const toggleFormEntityField = (
    entity: FormEntity,
    formField: FormEntityField
  ) => {
    if (fields.some((field) => field.data.id === formField.id)) {
      dispatch({ type: "unselect form field", id: formField.id });
    } else {
      dispatch({ type: "select form field", formField, entity });
    }
  };

  const clearSelectedFields = () => {
    dispatch({ type: "clear form fields" });
  };

  const clearSelectedComponent = () => {
    dispatch({ type: "clear component" });
  };

  const setSelectedComponent = (component: Component) => {
    dispatch({ type: "set component", component });
  };

  const setPage = (page: FormPage) => {
    navigate.to(`../pages/${page.id}`);
  };

  const setFormComponent = (formComponent: FormComponent) => {
    dispatch({ type: "set form component", formComponent });
  };

  const resetFormComponent = () => {
    dispatch({ type: "reset form component" });
  };

  return {
    page: {
      set: setPage,
    },
    component: {
      isVisible: !Boolean(component.data),
      data: component.data,
      isSelected: component.data !== null,
      clear: clearSelectedComponent,
      set: setSelectedComponent,
    },
    formComponent: {
      data: formComponent,
      isSelected: formComponent !== null,
      set: setFormComponent,
      reset: resetFormComponent,
    },
    selected: {
      fields: {
        clear: clearSelectedFields,
        toggle: toggleFormEntityField,
      },
    },
  };
};
