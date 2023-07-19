import { Page } from '@modules/core/components';
import React from 'react';
import { FormDialog } from '@modules/forms/components';
import { EventsList } from '@modules/events/components';

export interface EventsPagePageProps {}

const EventsPage : React.FC<EventsPagePageProps> = ({
  
}) => {

  return (
    <Page testId="events page">
      <EventsList />
      <FormDialog />
    </Page>
  );
};

export default EventsPage