import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TrafficLight from '@modules/core/components/TrafficLight/TrafficLight';
import { Box, IconButton } from '@mui/material';
import { CloseSharp } from '@mui/icons-material';

interface TrafficLightExplanationDialogProps {
  open: boolean;
  onClose: () => void;
}

export const TrafficLightExplanationDialog: React.FC<TrafficLightExplanationDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
     <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
        <Box sx={{ pr: 3 /* Abstand rechts für den Schließbutton */, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          Was die Ampel in unserer App bedeutet
        </Box>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseSharp />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Die Ampel gibt Ihnen eine schnelle Übersicht über den Status Ihrer Daten:
        </DialogContentText>
        <DialogContentText component="div">
          <ul style={{listStyle: 'none', padding: '0px', margin: '0px'}}>
            <li>
              <div style={{display: 'flex', alignItems: 'start', flexDirection:'column', marginTop: '20px'}}>
                <TrafficLight status={'green'} /> <span style={{ marginTop: '10px'}}>Alles ist aktuell. Ihre Daten sind vollständig mit dem Server synchronisiert.</span>
              </div>
            </li>
            <li>
              <div style={{display: 'flex', alignItems: 'start', flexDirection:'column', marginTop: '20px'}}>
                <TrafficLight status={'yellow'} /> <span style={{ marginTop: '10px'}}>Einige Daten könnten veraltet sein. Dies passiert, wenn Sie seit mehr als 2 Stunden keine Internetverbindung hatten um die Daten zu synchronisieren oder wenn eine größere Menge an Daten noch nicht synchronisierten wurde. Bitte verbinden Sie sich bald wieder mit dem Internet.</span>
              </div>
            </li>
            <li>
              <div style={{display: 'flex', alignItems: 'start', flexDirection:'column', marginTop: '20px'}}>
                <TrafficLight status={'red'} /> <span style={{ marginTop: '10px'}}>Es gibt ein Problem. Dies kann der Fall sein, wenn die letzte Synchronisation zu lange her ist, oder wenn ein Fehler in der App auftritt. Bitte melden Sie sich bei einer Ansprechperson.</span>
              </div>
            </li>
          </ul>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};