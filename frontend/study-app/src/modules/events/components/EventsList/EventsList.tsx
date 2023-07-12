import { List } from '@modules/core/components';
import { useGetEvents } from '@modules/events/hooks';
import { useFormIdContext } from '@modules/forms/contexts';
import React from 'react';

export interface EventsListProps {}

export const EventsList : React.FC<EventsListProps> = ({

}) => {
  const getEvents = useGetEvents();
  const { setForm } = useFormIdContext();

  return (
    <List 
      title='records'
      getListItems={getEvents}
      handleClick={setForm}
    />
  );
};