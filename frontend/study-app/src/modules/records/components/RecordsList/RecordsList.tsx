import { List } from '@modules/core/components';
import { useFormIdContext } from '@modules/forms/contexts';
import { useGetRecords } from '@modules/records/hooks';
import React from 'react';

export interface RecordsListProps {}

export const RecordsList : React.FC<RecordsListProps> = ({

}) => {
  const getRecords = useGetRecords();
  const { setForm } = useFormIdContext();

  return (
    <List 
      title='records'
      getListItems={getRecords}
      handleClick={setForm}
    />
  );
};