import { Column } from '@modules/core/components';
import { List, ListItem, ListItemText, Divider, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

export interface CalendarListProps {}

export const CalendarList : React.FC<CalendarListProps>= ({
  
}) => {
  const theme = useTheme();


  return (
    <Column>
      <List>
        <ListItem>
          <Column width={'100%'}>
            <ListItemText primary={dayjs().locale('de').format('LL')}/>
            <Divider 
              variant='fullWidth'
              sx={{borderColor: theme.palette.grey[600]}}
            />
            <List>
              <ListItem  
                secondaryAction={
                  <ListItemText primary={"test"}/>
                }
              >
                <ListItemText primary={"test"}/>
              </ListItem>
            </List>
          </Column>
        </ListItem>
      </List>
    </Column>
  );
};