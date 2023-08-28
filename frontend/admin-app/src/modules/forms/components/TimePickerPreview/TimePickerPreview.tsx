import { TextField } from "@mui/material";
import React from "react";

export type TimePickerComponent = {
  attributes: {
    label?: string;
    defaultValue?: string;
  };
};
export interface TimePickerPreviewProps {
  component: TimePickerComponent;
}

export const TimePickerPreview: React.FC<TimePickerPreviewProps> = ({
  component,
}) => {
  const { defaultValue, label } = component.attributes;
  return (
    <TextField
      type="time"
      margin="dense"
      label={label}
      defaultValue={defaultValue}
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
    />
  );
};
