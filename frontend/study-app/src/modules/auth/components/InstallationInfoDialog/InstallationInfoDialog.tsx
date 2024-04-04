import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { IosShare, Menu } from '@mui/icons-material';

interface InstallationInfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export const InstallationInfoDialog: React.FC<InstallationInfoDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Installation der PWA
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>iPhone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Schritte zur Installation auf dem iPhone:</strong><br />
              1. Klicken Sie im Safari-Browser auf das <IosShare fontSize="small" /> Teilen-Icon.<br />
              2. Wählen Sie "Zum Home-Bildschirm hinzufügen."
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Android</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Schritte zur Installation auf Android:</strong><br />
              1. Öffnen Sie Chrome und besuchen Sie die Website der PWA.<br />
              2. Tippen Sie auf das <Menu fontSize="small" /> Drei-Punkte-Menü und wählen Sie "Zum Startbildschirm hinzufügen."
            </Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};