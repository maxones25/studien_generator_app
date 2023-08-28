import { TextField } from "@mui/material";
import React from "react";

export type TextFieldComponent = {
  attributes: {
    label?: string;
    defaultValue: string;
  };
};
export interface TextFieldPreviewProps {
  component: TextFieldComponent;
}

export const TextFieldPreview: React.FC<TextFieldPreviewProps> = ({
  component,
}) => {
  const { label, defaultValue } = component.attributes;
  return (
    <TextField
      label={label}
      margin="dense"
      defaultValue={defaultValue}
      InputProps={{ readOnly: true }}
      fullWidth
    />
  );
};
