import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { TableRow, TableCell, Table, TableBody, Box, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseSharp } from '@mui/icons-material';

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

  const isObject = (value: any): value is Record<string, any> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  // Rekursive Funktion, um Objekteigenschaften zu rendernˇ
  const renderObjectRows = (obj: any, prefix = ''): JSX.Element[] => {
    return Object.entries(obj).flatMap(([key, value]) => {
      const fullKey = prefix ? `${prefix}.${key}` : key;
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
    <Dialog open={open} onClose={close}>
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