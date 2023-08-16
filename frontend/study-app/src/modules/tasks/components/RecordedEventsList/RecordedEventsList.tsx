import { Column, IconButton, List, Row, Text } from '@modules/core/components';
import { useNavigationHelper } from '@modules/core/hooks';
import { useDateContext } from '@modules/date/contexts';
import { useGetRecordedEventsByDate } from '@modules/tasks/hooks';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';
import { RecordedEventsListItem } from '..';
import { useTranslation } from 'react-i18next';

export interface RecordedEventsListProps {}

export const RecordedEventsList : React.FC<RecordedEventsListProps> = ({
  
}) => {
  const { date, isFuture } = useDateContext();
  const { data, isError, isLoading } = useGetRecordedEventsByDate({ date });
  const navigate = useNavigationHelper();
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
            onClick={navigate.handle('../events')}
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
    </Column>
  );
};