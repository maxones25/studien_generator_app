import { formatInputDateTime } from "@modules/date/utils";
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

  const isCurrentDateTime = defaultValue === "CurrentDateTime";

  console.log(formatInputDateTime());

  return (
    <TextField
      type="datetime-local"
      label={label}
      fullWidth
      margin="dense"
      defaultValue={defaultValue}
      InputProps={{ readOnly: true }}
      InputLabelProps={{ shrink: true }}
      value={isCurrentDateTime ? formatInputDateTime(new Date()) : defaultValue}
    />
  );
};
