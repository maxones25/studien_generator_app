import { formatTime } from "@modules/date/utils";
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

  const isCurrentTime = defaultValue === "CurrentTime";
  return (
    <TextField
      type="time"
      margin="dense"
      label={label}
      defaultValue={isCurrentTime ? formatTime(new Date()) : defaultValue}
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly: true }}
    />
  );
};
