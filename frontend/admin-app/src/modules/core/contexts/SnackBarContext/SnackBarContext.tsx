import { AlertColor } from "@mui/material";
import { createContext, FC, ReactNode, useContext, useState } from "react";

interface SnackBarData {
  open: boolean;
  message: string;
  color: AlertColor;
  duration: number;
}

export interface SnackBarContextValue extends SnackBarData {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
  reset: () => void;
}

interface SnackBarProviderProps {
  children: ReactNode;
}

const SnackBarContext = createContext<SnackBarContextValue | undefined>(
  undefined
);

const useSnackBarContextValue = () => {
  const [state, setState] = useState<SnackBarData>({
    open: false,
    message: "",
    color: "info",
    duration: 3000,
  });

  const showError = (message: string) => {
    setState({
      ...state,
      open: true,
      color: "error",
      message,
    });
  };

  const showSuccess = (message: string) => {
    setState({
      ...state,
      open: true,
      color: "success",
      message,
    });
  };

  const reset = () => {
    setState({
      ...state,
      open: false,
    });
  };

  return {
    ...state,
    reset,
    showSuccess,
    showError,
  };
};

export const SnackBarProvider: FC<SnackBarProviderProps> = ({ children }) => {
  const value = useSnackBarContextValue();

  return (
    <SnackBarContext.Provider value={value}>
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext);

  if (!context)
    throw new Error("SnackBarContext must be inside a SnackBarProvider");

  return context;
};
