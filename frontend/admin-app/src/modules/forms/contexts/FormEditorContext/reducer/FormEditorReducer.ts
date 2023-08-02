import { Reducer } from "react";
import { FormEditorState } from "./FormEditorState";
import { FormEditorAction } from "./FormEditorActions";

export const formEditorReducer: Reducer<FormEditorState, FormEditorAction> = (
  state,
  action
) => {
  const { fields, component, page } = state;

  switch (action.type) {
    case "set page number": {
      return {
        ...state,
        page: {
          ...page,
          number: action.pageNumber,
        },
      };
    }
    case "select form field": {
      return {
        ...state,
        fields: [...fields, { data: action.formField, entity: action.entity }],
      };
    }
    case "unselect form field": {
      return {
        ...state,
        fields: fields.filter((field) => field.data.id !== action.id),
      };
    }
    case "clear form fields": {
      return {
        ...state,
        fields: [],
      };
    }
    case "set component": {
      return {
        ...state,
        component: {
          ...component,
          isVisible: false,
          data: action.component,
        },
      };
    }
    case "clear component": {
      return {
        ...state,
        component: {
          ...component,
          isVisible: true,
          data: null,
        },
      };
    }
    default:
      return state;
  }
};
