import { useCalendarContext } from '@modules/calendar/contexts';
import { Column } from '@modules/core/components';
import { List, ListItem, ListItemText, Divider, useTheme, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export interface CalendarListProps {}

export const CalendarList : React.FC<CalendarListProps>= ({
  
}) => {
  const theme = useTheme();
  const { dates, isLoading } = useCalendarContext();
  const containerRef = React.useRef<HTMLUListElement>(null);
  const targetElementRef = React.useRef<HTMLLIElement>(null);

  React.useEffect(() => {
      if (containerRef.current && targetElementRef.current) {
          const topPosition = targetElementRef.current.offsetTop;
          containerRef.current.scrollTop = topPosition;
      }
  }, []);

  const dateString = (date: Date, format: string) => 
    dayjs(date).locale('de').format(format)


  return (
    <Column alignItems="center" py={1} overflow={"hidden"}>
      {isLoading ? (
        <CircularProgress sx={{mt: 5}} data-testid={`loading calendar entries spinner`} />
      ) : (
        <List 
          sx={{ 
            width: "100%",
            overflowY: "auto",
          }}
          ref={containerRef}
        >
          {dates?.map(({ date, entries }) => 
            <ListItem 
              ref={targetElementRef} 
              key={date.toDateString()}
            >
              <Column width={'100%'}>
                <ListItemText primary={dateString(date, 'LL')}/>
                <Divider 
                  variant='fullWidth'
                  sx={{borderColor: theme.palette.grey[600]}}
                />
                <List>
                  {entries.map(({ scheduledAt, id, name }) => 
                    <ListItem
                      key={id}  
                      secondaryAction={
                        <ListItemText primary={dateString(scheduledAt, 'HH:mm')}/>
                      }
                    >
                      <ListItemText primary={name}/>
                    </ListItem>
                  )}
                </List>
              </Column>
            </ListItem>
          )}
        </List>
      )}
    </Column>
  );
};