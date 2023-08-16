import { ListItem, styled } from "@mui/material";

export const StyledListItem = styled(ListItem)(({  }) => ({
  padding: '4px 12px',
  margin: '12px 4px',
  width: 'auto',
  backgroundColor: 'lightgrey',
  '& .MuiListItemButton-root' : {
    padding: '0',
  },
  '& .MuiListItemText-primary' : {
    whiteSpace: "nowrap",    
    overflow: "hidden",     
    textOverflow: "ellipsis",
  }
}))