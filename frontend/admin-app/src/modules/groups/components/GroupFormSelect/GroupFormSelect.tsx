import { FormSelect } from "@modules/core/components";
import { useGetGroupForms } from "@modules/formConfigs/hooks";
import { CircularProgress } from "@mui/material";
import { Control, FieldValues, Path, RegisterOptions } from "react-hook-form";

export interface GroupFormSelectProps<TFieldValues extends FieldValues> {
  groupId: string;

  control: Control<TFieldValues>;

  name: Path<TFieldValues>;

  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
  label?: string;
}

export const GroupFormSelect = <TFieldValues extends FieldValues>({
  groupId,
  label,
  control,
  rules,
  name,
}: GroupFormSelectProps<TFieldValues>) => {
  const getConfigs = useGetGroupForms({
    isActive: true,
    type: "TimeDependent",
    groupId,
  });

  if (getConfigs.isLoading) {
    return <CircularProgress />;
  }

  const options =
    getConfigs.data?.map((config) => ({
      label: config.form.name,
      value: config.form.id,
    })) ?? [];

  return (
    <FormSelect
      control={control}
      name={name}
      rules={rules}
      label={label}
      options={options}
    />
  );
};
