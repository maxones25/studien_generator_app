import { Box, BoxProps } from "@mui/material";
import React, { forwardRef } from "react";

export interface ColumnProps extends BoxProps {}

export const Column: React.FC<ColumnProps> = forwardRef(
  ({ sx, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        sx={{ display: "flex", flexDirection: "column", ...sx }}
        {...props}
      ></Box>
    );
  }
);

Column.displayName = 'Column';
