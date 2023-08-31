import { Autocomplete, Chip, TextField, TextFieldProps } from "@mui/material";

export interface TagsFieldProps<Data extends Record<string, any>> {
  onChange: (tags: any) => void;
  // onChange: (tags: string[]) => void;
  options?: Data[];
  label?: string;
  value?: string[];

  textFieldProps?: TextFieldProps;
  renderChip: (item: Data, index: number) => { label: string };
}

export const TagsField = <Data extends Record<string, any>>({
  label,
  value,
  textFieldProps,
  options = [],
  renderChip,
  onChange,
}: TagsFieldProps<Data>) => {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={options}
      onChange={(_, values) => {
        onChange(values);
      }}
      freeSolo
      value={value}
      renderTags={(item, getTagProps) =>
        item.map((option, index) => {
          const { label } = renderChip(option, index);
          return (
            <Chip
              variant="outlined"
              label={label}
              {...getTagProps({ index })}
            />
          );
        })
      }
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            {...textFieldProps}
            label={label}
            multiline
            margin="normal"
          />
        );
      }}
    />
  );
};
