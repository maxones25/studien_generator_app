import React from "react";
import { Column, ColumnProps } from "../Column/Column";
import { Box } from "@mui/material";
import { useAccessTokenContext } from "@modules/auth/contexts";
import { AppBar } from "@modules/navigation/components";

export interface PageProps extends ColumnProps {
  testId: string;
}

export const Page: React.FC<PageProps> = ({ sx, testId, ...props }) => {
  const accessToken = useAccessTokenContext();

  return (
    <Box sx={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      }}>
      {accessToken.isValid && <AppBar />}
      <Column
      data-testid={testId}
      sx={{
        position: "relative",
        overflowY: "scroll",
        bgcolor: "background.default",
        flexGrow: "1",
        paddingX: "5vw",
        ...sx,
      }}
      {...props}
    />
    </Box>
  );
};
