import { Column, IconButton, List, Row, Text } from '@modules/core/components';
import { useNavigationHelper } from '@modules/core/hooks';
import { useGetFiledRecordsByDate } from '@modules/tasks/hooks';
import { AddOutlined } from '@mui/icons-material';
import React from 'react';

export interface RecordedEventsListProps {}

export const RecordedEventsList : React.FC<RecordedEventsListProps> = ({
  
}) => {
  const getFiledRecords = useGetFiledRecordsByDate();
  const navigate = useNavigationHelper();

  return (
    <Column>
      <Row justifyContent={"space-between"}>
        <Text>Ereignisse</Text>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={navigate.handle('../events')}
            testId={'add-record-filed-records-list'}
            Icon={<AddOutlined />}
          />
      </Row>
      <List 
        title='filed records'
        getListItems={getFiledRecords}
        handleClick={() => {}}
      />
    </Column>
  );
};