import React from "react";
import {
  CircularProgress,
  Button as MButton,
  ButtonProps as MButtonProps,
} from "@mui/material";

export interface ButtonProps extends MButtonProps {
  testId: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  isLoading = false,
  children,
  testId,
  ...props
}) => {
  return (
    <MButton 
      data-testid={testId} 
      color={color} 
      variant={variant} 
      {...props}
      disabled={props.disabled || isLoading}
      >
      {isLoading ? <CircularProgress size="1.5rem" color="inherit" /> : children}
    </MButton>
  );
};
