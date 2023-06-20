import React from "react";
import { Column, ColumnProps } from "../Column/Column";

export interface PageProps extends ColumnProps {}

export const Page: React.FC<PageProps> = ({ sx, ...props }) => {
  return (
    <Column
      sx={{
        position: "relative",
        height: "100vh",
        overflowY: "hidden",
        bgcolor: "background.default",
        ...sx,
      }}
      {...props}
    />
  );
};
