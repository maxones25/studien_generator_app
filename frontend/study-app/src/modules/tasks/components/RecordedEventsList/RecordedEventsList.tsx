import { Column, IconButton, List, Row, Text } from '@modules/core/components';
import { useNavigationHelper } from '@modules/core/hooks';
import { useDateContext } from '@modules/date/contexts';
import { useGetRecordedEventsByDate } from '@modules/tasks/hooks';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';

export interface RecordedEventsListProps {}

export const RecordedEventsList : React.FC<RecordedEventsListProps> = ({
  
}) => {
  const { value: date } = useDateContext();
  const getFiledRecords = useGetRecordedEventsByDate({ date });
  const navigate = useNavigationHelper();

  return (
    <Column overflow={"hidden"}>
      <Row justifyContent={"space-between"}>
        <Text>Ereignisse</Text>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={navigate.handle('../events')}
            testId={'add-event'}
            Icon={<AddOutlined />}
          />
      </Row>
      <List 
        title='recorded events'
        getListItems={getFiledRecords}
        handleClick={() => {}}
      />
    </Column>
  );
};