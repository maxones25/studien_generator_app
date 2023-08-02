import { Component } from "@modules/components/types";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";

export type FormEditorState = {
  page: {
    number: number;
  };
  component: {
    data: Component | null;
    isVisible: boolean;
  };
  fields: { entity: FormEntity; data: FormEntityField }[];
};
