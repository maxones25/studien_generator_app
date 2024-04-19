import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { ParticipantInfo } from '@modules/settings/types';
import { TableRow, TableCell, Table, TableBody, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseSharp } from '@mui/icons-material';

export interface ParticipantInfoDialogProps {
  open: boolean
  info?: ParticipantInfo
  close: VoidFunction
}

export const ParticipantInfoDialog : React.FC<ParticipantInfoDialogProps>= ({
  open,
  info,
  close
}) => {
  const { t } = useTranslation(); 

  const isObject = (value: any): value is Record<string, any> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  // Rekursive Funktion, um Objekteigenschaften zu rendern
  const renderObjectRows = (obj: any, prefix = ''): JSX.Element[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      if (fullKey === 'id') return <></>
      if (isObject(value)) {
        return renderObjectRows(value, fullKey);
      } else {
        return (
          <TableRow key={fullKey}>
            <TableCell>{t(fullKey)}</TableCell>
            <TableCell>{value as String}</TableCell>
          </TableRow>
        );
      }
    });
  };

  return info ? (
    <Dialog open={open} onClose={close} fullWidth maxWidth='lg'>
      <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
        <Box sx={{ pr: 3 /* Abstand rechts für den Schließbutton */, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {t('participant info')}
        </Box>
        <IconButton
          aria-label="close"
          onClick={close}
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
        <Table size="small">
          <TableBody>
            {renderObjectRows(info)}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  ) : <></>;
};