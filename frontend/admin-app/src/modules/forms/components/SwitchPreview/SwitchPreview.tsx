import { FormControlLabel, Switch } from "@mui/material";
import React from "react";

export type SwitchComponent = {
  attributes: {
    label?: string;
    defaultValue?: boolean;
  };
};
export interface SwitchPreviewProps {
  component: SwitchComponent;
}

export const SwitchPreview: React.FC<SwitchPreviewProps> = ({ component }) => {
  const { defaultValue = false, label } = component.attributes;
  return (
    <FormControlLabel
      control={<Switch checked={defaultValue} readOnly />}
      label={label}
    />
  );
};
