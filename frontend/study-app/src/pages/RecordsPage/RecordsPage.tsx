import { Page } from '@modules/core/components';
import React from 'react';
import { RecordsList } from '@modules/records/components';
import { FormDialog } from '@modules/forms/components';

export interface RecordsPageProps {}

const RecordsPage : React.FC<RecordsPageProps> = ({
  
}) => {

  return (
    <Page testId="home page">
      <RecordsList />
      <FormDialog />
    </Page>
  );
};

export default RecordsPage