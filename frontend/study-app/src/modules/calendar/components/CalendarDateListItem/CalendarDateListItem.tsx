import { CalendarListItem } from '@modules/calendar/types';
import { getDateStringFromItem } from '@modules/calendar/utils';
import { ListItemText, ListItem, styled, useTheme } from '@mui/material';
import React from 'react';

const StyledListItem = styled(ListItem)(({  }) => ({
  padding: '4px 2px',
  margin: '0px',
  width: 'auto',
  '& .MuiListItemText-primary' : {
    whiteSpace: "nowrap",    
    overflow: "hidden",     
    textOverflow: "ellipsis",
    fontSize: '0.9rem',
  }
}))

export interface CalendarDateListItemProps {
  item: CalendarListItem;
  divider: boolean;
}

export const CalendarDateListItem : React.FC<CalendarDateListItemProps>= ({
  item,
  divider,
}) => {
  const { palette } = useTheme();
  const color = 'scheduledAt' in item ? palette.error.light : palette.secondary.main;

  return (
    <StyledListItem
      divider={divider}
      secondaryAction={
        <ListItemText primary={getDateStringFromItem(item)}/>
      }
    >
      <ListItemText  
        sx={{ borderLeft: 'solid', borderLeftColor: color, pl: 1}} 
        primary={item.name}/>
    </StyledListItem>
  );
};