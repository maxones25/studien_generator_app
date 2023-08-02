import { Box, BoxProps } from "@mui/material";
import React from "react";

export interface RowProps extends BoxProps {}

export const Row: React.FC<RowProps> = (props) => {
  return <Box display="flex" alignItems="center" {...props}></Box>;
};
