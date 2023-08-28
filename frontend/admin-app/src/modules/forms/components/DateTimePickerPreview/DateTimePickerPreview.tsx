import { TextField } from "@mui/material";
import React from "react";

export type DateTimeComponent = {
  attributes: {
    defaultValue?: string;
    label?: string;
  };
};
export interface DateTimePickerPreviewProps {
  component: DateTimeComponent;
}

export const DateTimePickerPreview: React.FC<DateTimePickerPreviewProps> = ({
  component,
}) => {
  const { defaultValue, label } = component.attributes;
  return (
    <TextField
      type="datetime-local"
      label={label}
      fullWidth
      margin="dense"
      defaultValue={defaultValue}
      InputProps={{ readOnly: true }}
      InputLabelProps={{ shrink: true }}
    />
  );
};
