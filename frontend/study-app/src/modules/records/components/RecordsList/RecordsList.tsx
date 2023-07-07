import { Column, Text } from '@modules/core/components';
import { useMultiFormContext } from '@modules/forms/contexts';
import { useGetRecords } from '@modules/records/hooks';
import { CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface RecordsListProps {}

export const RecordsList : React.FC<RecordsListProps> = ({

}) => {
  const getRecords = useGetRecords();
  const { t } = useTranslation();
  const { getMultiForm } = useMultiFormContext();

  const hasRecords = (getRecords.data?.length ?? 0) > 0;

  return (
    <Column alignItems="center" py={1} px={2}>
      {getRecords.isLoading ? (
        <CircularProgress sx={{mt: 5}} data-testid="loading records spinner" />
      ) : getRecords.isError ? (
        <Text data-testid="get-records-error-text" color="error.main">
          {t("error: records could not load")}
        </Text>
      ) : !hasRecords ? (
        <Text>{t("no records found")}</Text>
      ) : (
        <List sx={{ width: "100%" }}>
          {getRecords.data?.map((record, i, arr) => (
            <ListItem
              key={record.id}
              divider={i < arr.length - 1}
              disablePadding
              dense
            >
              <ListItemButton onClick={() => getMultiForm(record.id)}>
                <ListItemText primary={record.name}/>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      )}
    </Column>
  );
};