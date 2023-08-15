import React, { FormEventHandler, forwardRef } from "react";
import { Column, ColumnProps } from "../Column/Column";

export interface FormProps extends ColumnProps {}

export const Form: React.FC<FormProps> = forwardRef(
  ({ sx, onSubmit, ...props }, ref) => {
    const handleSubmit: FormEventHandler<HTMLDivElement> = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSubmit) {
        onSubmit(e);
      }
    };

    return (
      <Column
        ref={ref}
        component="form"
        sx={{ ...sx }}
        onSubmit={handleSubmit}
        {...props}
      ></Column>
    );
  }
);

Form.displayName = "Form";