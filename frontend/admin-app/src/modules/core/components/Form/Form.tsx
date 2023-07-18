import { FormEventHandler } from "react";
import { Column, ColumnProps } from "../Column/Column";
import { ReactHookFormDevTools } from "..";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

export interface FormProps<FormData extends FieldValues>
  extends Omit<ColumnProps, "onSubmit"> {
  form: UseFormReturn<FormData, any, undefined>;
  onSubmit: SubmitHandler<FormData>;
}

export function Form<FormData extends FieldValues>({
  onSubmit,
  form,
  children,
  ...props
}: FormProps<FormData>) {
  const handleSubmit: FormEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(onSubmit)(e);
  };

  return (
    <FormProvider {...form}>
      <Column component="form" onSubmit={handleSubmit} {...props}>
        {children}
        <ReactHookFormDevTools />
      </Column>
    </FormProvider>
  );
}
