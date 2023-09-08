import { useSnackBarContext } from "@modules/core/contexts";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

export interface AlertNotificationProps {}

export const AlertNotification: React.FC<AlertNotificationProps> = () => {
  const { duration, open, color, message, reset } = useSnackBarContext();

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={duration}
      onClose={reset}
    >
      <Alert
        data-testid={`${color} alert`}
        variant="filled"
        color={color}
        onClose={reset}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
