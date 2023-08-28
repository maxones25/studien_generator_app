import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

export type CheckBoxComponent = {
  attributes: {
    label?: string;
    defaultValue?: boolean;
  };
};

export interface CheckBoxPreviewProps {
  component: CheckBoxComponent;
}

export const CheckBoxPreview: React.FC<CheckBoxPreviewProps> = ({
  component,
}) => {
  const { defaultValue = false, label } = component.attributes;
  return (
    <FormControlLabel
      control={<Checkbox checked={defaultValue} readOnly />}
      label={label}
    />
  );
};
