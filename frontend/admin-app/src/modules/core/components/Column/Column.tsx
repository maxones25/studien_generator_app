import { Box, BoxProps } from "@mui/material";
import React, { forwardRef } from "react";

export interface ColumnProps extends BoxProps {
  overflowY?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

export const Column: React.FC<ColumnProps> = forwardRef(
  ({ sx, overflowY, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        display="flex"
        flexDirection="column"
        position="relative"
        sx={{ ...{ overflowY }, ...sx }}
        {...props}
      ></Box>
    );
  }
);

Column.displayName = "Column";
