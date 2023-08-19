import { Column, IconButton, List, Row, Text } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { useGetRecordedEventsByDate } from '@modules/tasks/hooks';
import { AddOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { RecordedEventsListItem } from '..';
import { useTranslation } from 'react-i18next';
import { EventsList } from '@modules/events/components';
import { Dialog, DialogTitle } from '@mui/material';

export interface RecordedEventsListProps {}

export const RecordedEventsList : React.FC<RecordedEventsListProps> = ({
  
}) => {
  const { date, isFuture } = useDateContext();
  const { data, isError, isLoading } = useGetRecordedEventsByDate({ date });
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Column overflow={"hidden"}>
      <Row justifyContent={"space-between"}>
        <Text variant='h6'>{t('recorded events')}</Text>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            disabled = {isFuture}
            onClick={() => setOpen(true)}
            testId={'add-event'}
            Icon={<AddOutlined />}
          />
      </Row>
      <List 
        title='recorded events'
        isLoading={isLoading}
        isError={isError}
      >
        {data?.map((record) => 
          <RecordedEventsListItem key={record.id} record={record} />
        )}
      </List>
      <Dialog maxWidth='sm' fullWidth open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{t('events')}</DialogTitle>
        <EventsList />
      </Dialog>
    </Column>
  );
};