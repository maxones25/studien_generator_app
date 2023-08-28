import { Select, SelectOption } from "@modules/core/components";
import React from "react";

export type SelectComponent = {
  id: string;
  type: "Select";
  formFields: [
    {
      id: string;
      entityField: {
        id: string;
        attributes: {
          values: string[];
        };
      };
    }
  ];
  attributes: {
    label?: string;
    defaultValue?: string;
  };
};

export interface SelectPreviewProps {
  component: SelectComponent;
}

export const SelectPreview: React.FC<SelectPreviewProps> = ({ component }) => {
  const options =
    component.formFields[0].entityField.attributes.values.map<SelectOption>(
      (value) => ({
        label: value,
        value,
      })
    );
  return (
    <Select
      name={component.id}
      label={component.attributes.label}
      options={options}
      readOnly={true}
      value={component.attributes.defaultValue}
      formControlProps={{ fullWidth: true }}
    />
  );
};
