import { TextField } from "@mui/material";
import React from "react";

export type DateComponent = {
  attributes: {
    label?: string;
    defaultValue?: string;
  };
};
export interface DatePreviewProps {
  component: DateComponent;
}

export const DatePickerPreview: React.FC<DatePreviewProps> = ({
  component,
}) => {
  const { defaultValue, label } = component.attributes;
  return (
    <TextField
      label={label}
      type="date"
      margin="dense"
      defaultValue={defaultValue}
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
      fullWidth
    />
  );
};
