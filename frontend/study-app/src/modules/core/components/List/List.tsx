import React from 'react';
import { Column, Text } from '@modules/core/components';
import { CircularProgress, List as MList } from '@mui/material';
import { useTranslation } from 'react-i18next';

export interface ListProps {
  title: string;
  children?: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
}

export const List : React.FC<ListProps> = ({
  title,
  isLoading,
  isError,
  children,
}) => {
  const { t } = useTranslation();
  const hasItems = Boolean(children);

  return (
    <Column alignItems="center" overflow={"hidden"}>
      {isLoading ? (
        <CircularProgress sx={{mt: 5}} data-testid={`loading ${title} spinner`} />
      ) : isError ? (
        <Text data-testid={`get-${title}-error-text`} color="error.main">
          {t(`error: ${title} could not load`)}        
        </Text>
      ) : !hasItems ? (
        <Text>{t(`no values found`, {value: t(title)})}</Text>
      ) : (
        <MList sx={{ 
          width: "100%",
          overflowY: "auto",
        }}>
          {children}
        </MList>
      )}
    </Column>
  );
};