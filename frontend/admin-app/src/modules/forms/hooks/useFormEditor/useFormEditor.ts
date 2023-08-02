import { Component } from "@modules/components/types";
import { useNavigationHelper } from "@modules/core/hooks";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";
import { FormPage } from "@modules/formPages/types";
import { useFormEditorContext } from "@modules/forms/contexts";

export interface UseFormEditorResult {
  page: {
    set: (page: FormPage) => void;
  };
  component: {
    data: Component | null;
    isSelected: boolean;
    set: (component: Component) => void;
    clear: () => void;
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
    state: { fields, component },
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
    // dispatch({ type: "set page number", pageNumber: page.number });
  };

  return {
    page: {
      set: setPage,
    },
    component: {
      data: component.data,
      isSelected: component.data !== null,
      clear: clearSelectedComponent,
      set: setSelectedComponent,
    },
    selected: {
      fields: {
        clear: clearSelectedFields,
        toggle: toggleFormEntityField,
      },
    },
  };
};
