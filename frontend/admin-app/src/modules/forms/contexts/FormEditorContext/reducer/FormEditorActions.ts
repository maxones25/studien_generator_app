import { Component } from "@modules/components/types";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";

type SelectFormField = {
  type: "select form field";
  formField: FormEntityField;
  entity: FormEntity;
};

type UnselectFormField = {
  type: "unselect form field";
  id: string;
};

type ClearFormFields = {
  type: "clear form fields";
};

type ClearComponent = {
  type: "clear component";
};

type SetComponent = {
  type: "set component";
  component: Component;
};

type SetPageNumber = {
  type: "set page number";
  pageNumber: number;
};


export type FormEditorAction =
  | SelectFormField
  | UnselectFormField
  | ClearFormFields
  | ClearComponent
  | SetPageNumber
  | SetComponent;
