import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import React from "react";

export interface ConfirmDialogProps extends DialogProps {
  title: string;
  text: string;
  renderActions: JSX.Element;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  renderActions,
  title,
  text,
  ...props
}) => {
  return (
    <Dialog {...props}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>{renderActions}</DialogActions>
    </Dialog>
  );
};
