import React from "react";
import { Column, ColumnProps } from "../Column/Column";

export interface PageProps extends ColumnProps {
  testId: string;
}

export const Page: React.FC<PageProps> = ({ sx, testId, ...props }) => {
  return (
      <Column
        data-testid={testId}
        sx={{
          position: "relative",
          height: "100vh",
          overflowY: "scroll",
          bgcolor: "background.default",
          ...sx,
        }}
        {...props}
      />
  );
};
