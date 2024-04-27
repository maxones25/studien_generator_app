import { FieldType } from "@modules/fields/types";

export type ComponentAttributes = Record<
  string,
  {
    name: string;
    type: string;
    required: boolean;
  }
>;

export type Component = {
  id?: string;
  name: string;
  entityFields: FieldType[];
  attributes: ComponentAttributes;
};
