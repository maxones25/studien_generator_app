import { createTheme, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/x-date-pickers";
import React from "react";

const theme = createTheme(
  {
  palette: {
    // mode: "dark",
    },
  },
  deDE,
);

export interface ThemeProps {
  children: React.ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
