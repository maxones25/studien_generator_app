import React, { forwardRef } from 'react';
import { Column, Text } from '@modules/core/components';
import { CircularProgress, List as MList } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ListProps {
  title: string;
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
}

export const List = forwardRef<HTMLUListElement, ListProps>(({
  title,
  isLoading,
  isError,
  children,
}, ref) => {
  const { t } = useTranslation();
  const hasItems = children ? (children as Array<any>).length > 0 : false; 

  return (
    <Column alignItems="center" overflow={"hidden"}>
      {isLoading ? (
        <CircularProgress sx={{m: 5}} data-testid={`loading ${title} spinner`} />
      ) : isError ? (
        <Text data-testid={`get-${title}-error-text`} color="error.main">
          {t(`error: ${title} could not load`)}        
        </Text>
      ) : !hasItems ? (
        <Text sx={{m: 5}}>{t(`no values found`, {value: t(title)})}</Text>
      ) : (
        <MList 
          sx={{ 
            width: "100%",
            overflowY: "auto",
            padding: "0",
          }}
          ref={ref}
        >
          {children}
        </MList>
      )}
    </Column>
  );
});