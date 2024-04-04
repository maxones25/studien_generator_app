import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SettingsIcon from '@mui/icons-material/Settings'; // Symbolisiert Einstellungen
import NotificationsIcon from '@mui/icons-material/Notifications'; // Symbolisiert Benachrichtigungen

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionInfoDialog: React.FC<InfoDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Push-Benachrichtigungen aktivieren
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
        <Typography paragraph>
          Falls beim Abonnieren der Benachrichtigungen ein Fehler auftritt, wurde die Erlaubnis möglicherweise abgelehnt. Erlauben Sie Benachrichtigungen in den Einstellungen gemäß den nächsten Schritten.
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>iPhone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>So erlauben Sie Push-Benachrichtigungen für die "Studien-App" auf iOS:</strong><br />
              1. Öffnen Sie die <SettingsIcon fontSize="small" /> Einstellungen.<br />
              2. Scrollen Sie nach unten und wählen Sie "Studien-App".<br />
              3. Tippen Sie auf Benachrichtigungen und aktivieren Sie sie.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Android</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <strong>Schritte zur Aktivierung von Push-Benachrichtigungen auf Android:</strong><br />
              1. Öffnen Sie Chrome und gehen Sie zu den Einstellungen.<br />
              2. Tippen Sie auf Website-Einstellungen.<br />
              3. Wählen Sie <NotificationsIcon fontSize="small" /> Benachrichtigungen und erlauben Sie sie für die gewünschten Seiten.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};
