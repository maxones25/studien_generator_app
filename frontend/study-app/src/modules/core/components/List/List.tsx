import React from 'react';
import { Column, Text } from '@modules/core/components';
import { CircularProgress, List as MList, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { UseReadRequestResult } from '@modules/core/hooks';

export interface ListProps {
  title: string;
  getListItems: UseReadRequestResult<any[]>;
  handleClick: (id: string, name: string) => void;
}

export const List : React.FC<ListProps> = ({
  title,
  getListItems,
  handleClick,
}) => {
  const { t } = useTranslation();
  const hasItems = (getListItems.data?.length ?? 0) > 0;

  return (
    <Column alignItems="center" py={1} px={2} overflow={"hidden"}>
      {getListItems.isLoading ? (
        <CircularProgress sx={{mt: 5}} data-testid={`loading ${title} spinner`} />
      ) : getListItems.isError ? (
        <Text data-testid={`get-${title}-error-text`} color="error.main">
          {t(`error: ${title} could not load`)}        
        </Text>
      ) : !hasItems ? (
        <Text>{t(`no ${title} found`)}</Text>
      ) : (
        <MList sx={{ 
          width: "100%",
          overflowY: "auto",
        }}>
          {getListItems.data?.map((item, i, arr) => (
            <ListItem
              key={item.id}
              divider={i < arr.length - 1}
            >
              <ListItemButton onClick={() => handleClick(item.id, item.name)}>
                <ListItemText primary={item.name}/>
              </ListItemButton>
            </ListItem>
          ))}
        </MList>
      )}
    </Column>
  );
};