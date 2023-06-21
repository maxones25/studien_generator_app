import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export interface TextProps extends TypographyProps {}

export const Text: React.FC<TextProps> = (props) => {
  return <Typography color="text.primary" {...props} />;
};
