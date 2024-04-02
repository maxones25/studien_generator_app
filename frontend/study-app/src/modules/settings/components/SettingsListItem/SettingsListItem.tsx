import { Column, Row, Text } from '@modules/core/components';
import React from 'react';
import { useTranslation } from 'react-i18next';

export interface SettingsListItemProps {
  title: string,
  status: React.ReactNode,
}

export const SettingsListItem : React.FC<React.PropsWithChildren<SettingsListItemProps>>= props => {
  const { t } = useTranslation();
  
  return (
    <Column p='10px 0px' gap={'10px'}>
      <Row justifyContent={'space-between'}>
        <Text>{t(props.title)+':'}</Text>
        {props.status}
      </Row>
      <Row gap={'10px'}>
        {props.children}
      </Row>
    </Column>
  );
};