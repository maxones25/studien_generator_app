import { ColumnProps } from "@modules/core/components";
import { FieldValues } from "react-hook-form";

export interface FormProps<SubmitData extends FieldValues> {
  onSubmit: (data: SubmitData) => void;
  values?: SubmitData;
  isError?: boolean;
  isLoading?: boolean;
  isNew?: boolean;
  formProps?: ColumnProps;
}
