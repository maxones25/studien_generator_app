import React, { ReactNode, useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';

export interface HelpButtonProps {
  title: string,
  body: ReactNode,
}

export const HelpButton: React.FC<HelpButtonProps> = ({
  title,
  body,
}) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <HelpOutlineIcon />
      </IconButton>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={handleClose} aria-labelledby="help-dialog-title">
        <DialogTitle id="help-dialog-title">{t(title)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {body}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
}