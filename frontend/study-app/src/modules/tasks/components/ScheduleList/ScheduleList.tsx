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
    <Column overflow={"hidden"} minHeight={"50vh"} maxHeight={"50vh"}>
      <Text variant='h6'>{t('schedule')}</Text>
      <List 
        title='schedule'
        isLoading={isLoading}
        isError={isError}
      >
        {dates?.map((item) => {
          return 'scheduledAt' in item ? 
            <TaskItem key={item.id} task={item} /> : 
            <AppointmentItem key={item.id} appointment={item} />
        })}
      </List>
    </Column>
  );
};