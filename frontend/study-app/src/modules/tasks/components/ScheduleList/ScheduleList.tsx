import React from 'react';
import { useTranslation } from 'react-i18next';
import { Column, List, Text } from '@modules/core/components';
import { useGetSchedule } from '@modules/tasks/hooks';
import { AppointmentItem, TaskItem } from '..';

export interface ScheduleListProps {}

export const ScheduleList : React.FC<ScheduleListProps>= ({
  
}) => {
  const { t } = useTranslation();
  const { dates, isLoading, isError } = useGetSchedule();

  return (
    <Column padding={2} overflow={"hidden"}>
      <Text>{t('schedule')}</Text>
      <List 
        title='schedule'
        isLoading={isLoading}
        isError={isError}
      >
        {dates?.map((item, i, arr) => {
          const divider = i < arr.length - 1;
          return 'scheduledAt' in item ? 
            <TaskItem key={item.id} task={item} divider={divider}/> : 
            <AppointmentItem key={item.id} appointment={item} divider={divider}/>
        })}
      </List>
    </Column>
  );
};