import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useTranslation } from 'react-i18next';

export interface HelpButtonProps {
  title: string,
  body: string,
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
      <Dialog open={open} onClose={handleClose} aria-labelledby="help-dialog-title">
        <DialogTitle id="help-dialog-title">{t(title)}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t(body)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}