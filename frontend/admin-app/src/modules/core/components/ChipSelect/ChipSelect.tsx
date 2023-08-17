import { Chip, ChipProps } from "@mui/material";
import { Row, RowProps } from "..";

export type ChipSelectOption<T> = {
  value: T;
  label: string;
};

export interface ChipSelectProps<T extends string> {
  options: ChipSelectOption<T>[];
  value?: T;
  containerProps?: RowProps;
  chipProps?: ChipProps;
  onSelect: (value?: string) => void;
}

export const ChipSelect = <T extends string>({
  options,
  value,
  containerProps,
  chipProps,
  onSelect,
}: ChipSelectProps<T>) => {
  return (
    <Row flexWrap="wrap" {...containerProps}>
      {options.map((option) => (
        <Chip
          {...chipProps}
          key={option.value}
          label={option.label}
          color={value === option.value ? "primary" : "default"}
          onClick={() => {
            if (value !== option.value) {
              onSelect(option.value);
            } else {
              onSelect(undefined);
            }
          }}
          sx={{
            ...chipProps?.sx,
            m: 1,
          }}
        />
      ))}
    </Row>
  );
};
