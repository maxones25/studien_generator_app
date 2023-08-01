import { Button, Form, Page } from '@modules/core/components';
import { Hiit } from '@modules/hiit/components';
import { FormProps as FormComponentProps } from '@modules/core/components';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl } from '@mui/material';

export interface HiitPageProps {
  formProps?: FormComponentProps;
}

const HiitPage : React.FC<HiitPageProps>= ({
  formProps
}) => {
  const form = useForm();

  const handleSubmit = (data: any) => {
    console.log(data);
  }

  return (
    <Page testId=''>
      <Form
        onSubmit={form.handleSubmit(handleSubmit)}
        {...formProps}
      >
          <Hiit 
            control={form.control}
            componentId='1'
            formFields={[
              {entityFieldId: '2'},
              {entityFieldId: '3'},
              {entityFieldId: '4'},
            ]}
          />
        <FormControl margin="normal">
          <Button testId={`submit-form`} type="submit">
          Speichern
          </Button>
        </FormControl>
      </Form>
    </Page>
  );
};

export default HiitPage