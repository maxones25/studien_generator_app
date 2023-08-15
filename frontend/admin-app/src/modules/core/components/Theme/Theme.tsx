import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00588F",
      light: "#0071B8",
      dark: "#003E65",
    },
    secondary: {
      main: "#5DABD5",
      light: "#7DBCDE",
      dark: "#3A98CC",
    },
  },
});

export interface ThemeProps {
  children: React.ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
