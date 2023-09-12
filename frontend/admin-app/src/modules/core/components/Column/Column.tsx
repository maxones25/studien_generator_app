import { Box, BoxProps } from "@mui/material";
import React, { forwardRef } from "react";

export interface ColumnProps extends BoxProps {
  testId?: string;
  overflowY?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

export const Column: React.FC<ColumnProps> = forwardRef(
  ({ testId, sx, overflowY, ...props }, ref) => {
    return (
      <Box
        ref={ref}
        data-testid={testId}
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
