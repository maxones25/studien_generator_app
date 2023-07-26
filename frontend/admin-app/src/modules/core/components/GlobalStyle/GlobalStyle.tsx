import { GlobalStyles, useTheme } from "@mui/material";
import React from "react";

export interface GlobalStyleProps {}

export const GlobalStyle: React.FC<GlobalStyleProps> = () => {
  const theme = useTheme();

  return (
    <GlobalStyles
      styles={{
        "*::-webkit-scrollbar": { width: "8px" },
        "*::-webkit-scrollbar-thumb": {
          background: theme.palette.primary.main,
          borderRadius: "4px",
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.primary.dark,
        },
        "*::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.background.default,
          borderRadius: "4px"
        }
      }}
    />
  );
};
