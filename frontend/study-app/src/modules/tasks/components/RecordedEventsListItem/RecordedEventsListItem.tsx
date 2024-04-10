import { ListItemButton, ListItemText } from '@mui/material';
import React from 'react';
import {  ObjectInfoDialog, StyledListItem, Text } from '@modules/core/components';
import { Record, RecordField, findFormField } from '@modules/forms/types';
import dayjs from 'dayjs';
import { useOpen } from '@modules/core/hooks';
import { useGetForm } from '@modules/forms/hooks';
import { mapRecords } from '@modules/tasks/utils';

export interface RecordedEventsListItemProps {
  record: Record;
}

export const RecordedEventsListItem : React.FC<RecordedEventsListItemProps>= ({
  record,
}) => {
  const { isOpen, open: infoOpen, close } = useOpen(false);
  const dateString = dayjs(record.createdAt).format('HH:mm');
  const form = useGetForm({formId: record.formId});
  const fields = record?.fields?.map((field: RecordField) => {
    if (form.data != undefined)
      return {
      ...findFormField(form.data, field.formFieldId),
      value: field.value,
    }
  });
  const info = mapRecords({...record, fields});


  return (
    <StyledListItem secondaryAction={<Text fontSize={'0.875rem'}>{dateString}</Text>}>
      <ListItemButton onClick={infoOpen}>
        <ListItemText primary={record.name}/>
      </ListItemButton>
      {<ObjectInfoDialog open={isOpen} close={close} title={record.name} info={info}/>}
    </StyledListItem>
  );
};