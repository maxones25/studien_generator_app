import React from "react";
import { Button as MButton, ButtonProps as MButtonProps } from "@mui/material";

export interface ButtonProps extends MButtonProps {}

export const Button: React.FC<ButtonProps> = ({
  color = "primary",
  variant = "contained",
  ...props
}) => {
  return <MButton color={color} variant={variant} {...props}></MButton>;
};
