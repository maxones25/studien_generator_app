import { createTheme, ThemeProvider } from "@mui/material";
import { deDE } from "@mui/x-date-pickers";
import React from "react";

declare module '@mui/material/styles' {
  interface Theme {
    ultraLight: string
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    ultraLight?: string
  }
}

const theme = createTheme(
  {
    palette: {
      // mode: "dark",
      },
    ultraLight: '#d0dfed',
  },
  deDE,
);

export interface ThemeProps {
  children: React.ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
