import { useSnackBarContext } from "@modules/core/contexts";
import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

export interface AlertNotificationProps {}

export const AlertNotification: React.FC<AlertNotificationProps> = () => {
  const { duration, open, color, message, reset } = useSnackBarContext();
  const { t } = useTranslation();
 
  return (
    <Snackbar
      open={open}
      anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      autoHideDuration={duration}
      onClose={reset}
    >
      <Alert variant="filled" color={color} onClose={reset}>
        {t(message)}
      </Alert>
    </Snackbar>
  );
};
