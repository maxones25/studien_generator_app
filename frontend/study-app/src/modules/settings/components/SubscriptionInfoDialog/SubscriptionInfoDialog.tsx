import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface InfoDialogProps {
  open: boolean;
  onClose: () => void;
}

export const SubscriptionInfoDialog: React.FC<InfoDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Was sind Push-Benachrichtigungen?
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
          Push-Benachrichtigungen sind Nachrichten, die von einer App oder einer Website an Ihr Mobilgerät gesendet werden, auch wenn die App oder der Browser nicht aktiv genutzt werden. Sie dienen dazu, Sie über neue Nachrichten, Updates oder andere wichtige Informationen zu informieren.
        </Typography>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>iPhone</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>Folgen Sie diesen Schritten, um auf die Benachrichtigungseinstellungen für Safari auf Ihrem iPhone zuzugreifen:</Typography>
            {/* Platzhalter für ein Bild */}
            <Box sx={{ my: 2, textAlign: 'center' }}>
              {/* Bildquelle einfügen */}
              <img src="Pfad_zum_iPhone_Bild" alt="iPhone Einstellungen" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            {/* Weitere Schritte oder Beschreibungen */}
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Android</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>Folgen Sie diesen Schritten, um auf die Benachrichtigungseinstellungen für Chrome auf Ihrem Android-Gerät zuzugreifen:</Typography>
            {/* Platzhalter für ein Bild */}
            <Box sx={{ my: 2, textAlign: 'center' }}>
              {/* Bildquelle einfügen */}
              <img src="Pfad_zum_Android_Bild" alt="Android Einstellungen" style={{ maxWidth: '100%', height: 'auto' }} />
            </Box>
            {/* Weitere Schritte oder Beschreibungen */}
          </AccordionDetails>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
};