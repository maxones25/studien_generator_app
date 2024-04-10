import { Column, IconButton, List, Row, Text } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { useGetRecords } from '@modules/tasks/hooks';
import { AddOutlined } from '@mui/icons-material';
import React, { useState } from 'react';
import { RecordedEventsListItem } from '..';
import { useTranslation } from 'react-i18next';
import { EventsList } from '@modules/events/components';
import { Dialog, DialogTitle } from '@mui/material';
import dayjs from 'dayjs';

export interface RecordedEventsListProps {}

export const RecordedEventsList : React.FC<RecordedEventsListProps> = ({
  
}) => {
  const { date, isToday } = useDateContext();
  const { data, isError, isLoading } = useGetRecords();
  const filteredData = data?.filter((data) => !data.taskId && date.isSame(data.createdAt, 'day'))
  const sortedData = filteredData?.sort((a, b) => {
    return dayjs(b.createdAt).diff(a.createdAt)
  });

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
            disabled = {!isToday}
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
        {sortedData?.map((record) => 
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