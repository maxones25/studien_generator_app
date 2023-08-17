import {
  FormControl,
  FormControlProps,
  InputLabel,
  Select as MSelect,
  SelectProps as MSelectProps,
  MenuItem,
} from "@mui/material";
import React from "react";

export type SelectOption = {
  label: string;
  value: any;
};

export interface SelectProps extends MSelectProps {
  name: string;
  options: SelectOption[];
  formControlProps?: FormControlProps;
}

export const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  size,
  value = "",
  formControlProps,
  ...props
}) => {
  const labelId = `${name}-select`;

  return (
    <FormControl margin="normal" size={size} {...formControlProps}>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MSelect
        size={size}
        labelId={labelId}
        label={label}
        value={value}
        {...props}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MSelect>
    </FormControl>
  );
};
