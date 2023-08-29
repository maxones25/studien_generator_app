import { FieldType } from "@modules/fields/types";

export type Component = {
  name: string;
  entityFields: FieldType[];
  attributes: Record<
    string,
    {
      name: string;
      type: string;
      required: boolean;
    }
  >;
};
