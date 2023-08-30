import { Select, SelectOption } from "@modules/core/components";
import React from "react";

export type SelectComponent = {
  id: string;
  type: "Select";
  attributes: {
    label?: string;
    defaultValue?: string;
    options: string[];
  };
};

export interface SelectPreviewProps {
  component: SelectComponent;
}

export const SelectPreview: React.FC<SelectPreviewProps> = ({ component }) => {
  const { options, defaultValue, label } = component.attributes;
  const selectOptions = options.map<SelectOption>((value) => ({
    label: value,
    value,
  }));

  return (
    <Select
      name={component.id}
      label={label}
      options={selectOptions}
      readOnly={true}
      value={defaultValue}
      formControlProps={{ fullWidth: true }}
    />
  );
};
