import { Box, BoxProps } from "@mui/material";
import React from "react";

export interface RowProps extends BoxProps {}

export const Row: React.FC<RowProps> = ({ sx, ...props }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", ...sx }} {...props}></Box>
  );
};
