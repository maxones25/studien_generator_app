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
      primary: {
        main: '#006960',
        light: '#BFE1D7'
      },
      secondary: {
        dark: '#003E65',
        main: '#3A98CC',
        light: '#85CEE4'
      },
      success: {
        main: '#74BA59',
      },
      error: {
        main: '#C7361B',
      },
      grey: {
        '800': '#969997',
        '500': '#D0D0CF',
        '200': '#E4E4E4',
      }
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
