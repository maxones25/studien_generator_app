import { Page } from '@modules/core/components';
import React from 'react';
import { MultiFormDialog } from '../../modules/forms/components/MultiFormDialog/MultiFormDialog';
import { RecordsList } from '@modules/records/components';

export interface RecordsPageProps {}

const RecordsPage : React.FC<RecordsPageProps> = ({
  
}) => {

  return (
    <Page testId="home page">
      <RecordsList />
      <MultiFormDialog />
    </Page>
  );
};

export default RecordsPage