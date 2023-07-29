import { Page } from '@modules/core/components';
import { SettingsList } from '@modules/settings/components';
import React from 'react';

export interface SettingsPageProps {}

const SettingsPage : React.FC<SettingsPageProps>= ({
  
}) => {
  return (
    <Page testId='settings page'>
      <SettingsList />
    </Page>
  );
};

export default SettingsPage