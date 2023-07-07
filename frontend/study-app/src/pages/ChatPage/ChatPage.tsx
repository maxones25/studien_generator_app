import { Page, Text } from '@modules/core/components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

export interface ChatPageProps {}

const ChatPage : React.FC<ChatPageProps> = () => {
  const { t } = useTranslation();

  return (
    <Page testId="home page">
      <Text>{t("test")}</Text>
      <Outlet />
    </Page>
  );
};

export default ChatPage