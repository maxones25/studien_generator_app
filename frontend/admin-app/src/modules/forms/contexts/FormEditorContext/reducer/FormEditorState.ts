import { Component } from "@modules/components/types";
import { FormComponent } from "@modules/formComponents/types";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";

export type FormEditorState = {
  page: {
    number: number;
  };
  formComponent: FormComponent | null;
  component: {
    data: Component | null;
  };
  fields: { entity: FormEntity; data: FormEntityField }[];
};
