import { Box, BoxProps } from "@mui/material";
import React from "react";

export interface RowProps extends BoxProps {
  overflowY?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

export const Row: React.FC<RowProps> = ({
  sx,
  overflowY,
  ...props
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      position="relative"
      sx={{ ...{ overflowY }, ...sx }}
      {...props}
    ></Box>
  );
};
