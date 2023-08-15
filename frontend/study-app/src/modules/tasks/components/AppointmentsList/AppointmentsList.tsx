import { Column, List, Text } from '@modules/core/components';
import { useDateContext } from '@modules/date/contexts';
import { useGetAppointmentsByDate } from '@modules/tasks/hooks';
import React from 'react';

export interface AppointmentsListProps {}

export const AppointmentsList : React.FC<AppointmentsListProps>= ({
  
}) => {

  const { date } = useDateContext();
  const getAppointments = useGetAppointmentsByDate({ date });

  return (
    <Column overflow={"hidden"} maxHeight={"55%"} minHeight={"30%"}>
      <Text>Termine</Text>
      <List 
        title='tasks'
        getListItems={getAppointments}
        handleClick={() => {}}
      />
    </Column>
  );
};