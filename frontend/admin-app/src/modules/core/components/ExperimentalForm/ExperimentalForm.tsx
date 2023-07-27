import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Column, ColumnProps, ReactHookFormDevTools } from "..";
import { FormEventHandler } from "react";

export interface ExperimentalFormProps<FormData extends FieldValues>
  extends Omit<ColumnProps, "onSubmit"> {
  onSubmit: SubmitHandler<FormData>;
  values?: FormData;
}

export function ExperimentalForm<FormData extends FieldValues>({
  onSubmit,
  values,
  children,
  ...props
}: ExperimentalFormProps<FormData>) {
  const form = useForm<FormData>({ values });

  const handleSubmit: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <FormProvider {...props} {...form}>
      <Column component="form" onSubmit={handleSubmit} {...props}>
        {children}
        <ReactHookFormDevTools />
      </Column>
    </FormProvider>
  );
}
