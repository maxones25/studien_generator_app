import { CalendarList, CalendarSelect } from '@modules/calendar/components';
import { CalendarProvider } from '@modules/calendar/contexts';
import { Page } from '@modules/core/components';
import React from 'react';

export interface CalendarPageProps {}

const CalendarPage : React.FC<CalendarPageProps>= ({
  
}) => {

  return (
    <CalendarProvider>
      <Page 
        testId='calendar page'
        header={<CalendarSelect />}
        sx={{
          paddingX: "0",
          paddingY: "0",
        }}
      >
        <CalendarList />
      </Page>
    </CalendarProvider>
  );
};

export default CalendarPage