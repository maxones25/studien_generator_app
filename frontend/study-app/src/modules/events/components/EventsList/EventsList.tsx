import { List } from '@modules/core/components';
import { useGetEvents } from '@modules/events/hooks';
import React from 'react';
import { EventsListItem } from '..';

export interface EventsListProps {}

export const EventsList : React.FC<EventsListProps> = ({

}) => {
  const { data, isError, isLoading } = useGetEvents();

  return (
    <List 
      title='events'
      isLoading={isLoading}
      isError={isError}
    >
      {data?.map((item) => {
        return <EventsListItem key={item.id} event={item} />
      })}
    </List>
  );
};