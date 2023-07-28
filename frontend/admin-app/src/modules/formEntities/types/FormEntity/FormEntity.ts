import { EntityFieldType } from "@modules/fields/types";

export type FormEntityField = {
  id: string;
  name: string;
  type: EntityFieldType;
  component: {
    id: string;
    type: string;
  } | null;
};

export type FormEntity = {
  id: string;
  name: string;
  entity: {
    id: string;
    name: string;
  };
  fields: FormEntityField[];
};
