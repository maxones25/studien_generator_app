import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TableRow, TableCell, Table, TableBody, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseSharp } from '@mui/icons-material';
import dayjs from 'dayjs';
import { formatiOSDateShortWithTime } from '@modules/date/utils';

export interface ObjectInfoDialogProps {
  open: boolean
  info?: Record<string, any>
  close: VoidFunction
  title: string
}

export const ObjectInfoDialog : React.FC<ObjectInfoDialogProps>= ({
  open,
  info,
  close,
  title
}) => {
  const { t } = useTranslation(); 
  let isFormFields = false;


// Verbesserte Version der Hilfsfunktion, die jetzt nur prüft, ob ein Wert ein Objekt oder ein Array ist
const isComplex = (value: any): value is Record<string, any> | Array<any> => {
  return typeof value === 'object' && value !== null;
};

// Rekursive Funktion, um Objekt- und Arrayeigenschaften zu rendern
const renderObjectRows = (obj: any, prefix = ''): JSX.Element[] => {
  // Handhabt sowohl Objekte als auch Arrays
  const entries = Array.isArray(obj) ? obj.map((value, index) => [index, value]) : Object.entries(obj);

  return entries.flatMap(([key, value]) => {
    const fullKey = prefix ? `${prefix}.${key}` : key.toString();
    if (isComplex(value)) {
      // Wenn der Wert ein Objekt oder ein Array ist, rekurriere
      return renderObjectRows(value, fullKey);
    } else {
      if (dayjs(value).isValid() && value?.length == 24)
        value = formatiOSDateShortWithTime(dayjs(value).toDate())
      const tableRow = value != undefined ? (
        <TableRow key={fullKey}>
          <TableCell sx={{textAlign: isFormFields ? 'right' : 'left'}}>{t(fullKey)}</TableCell>
          <TableCell sx={{minWidth: '8rem', textAlign: isFormFields ? 'right' : 'left'}}>{value.toString()}</TableCell>
        </TableRow>
      ) : <></>
      if (fullKey === 'fields')
        isFormFields = true;
      return tableRow 
    }
  });
};

  return info ? (
    <Dialog open={open} onClose={close} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ m: 0, p: 2, position: 'relative' }}>
        <Box sx={{ pr: 3 /* Abstand rechts für den Schließbutton */, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
          {t(title)}
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
      <DialogContent sx={{ paddingX: .5 }}>
        <Table size="small">
          <TableBody>
            {renderObjectRows(info)}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  ) : <></>;
};