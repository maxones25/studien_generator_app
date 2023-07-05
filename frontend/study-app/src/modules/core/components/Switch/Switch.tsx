import {
  FormControlLabel,
  Switch as MSwitch,
  SwitchProps as MSwitchProps,
} from "@mui/material";
import React, { forwardRef } from "react";

export interface SwitchProps extends MSwitchProps {
  label?: string;
}

export const Switch: React.FC<SwitchProps> = forwardRef(
  ({ label, ...props }, ref) => {
    return (
      <FormControlLabel
        control={
          <MSwitch {...props} ref={ref} checked={props.value ? true : false} />
        }
        label={label}
      />
    );
  }
);
