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
    <Row flexWrap="wrap" {...containerProps} p={1} pb={0}>
      {options.map((option, i) => (
        <Chip
          {...chipProps}
          key={option.value}
          label={option.label}
          color={value === option.value ? "primary" : "default"}
          size="small"
          onClick={() => {
            if (value !== option.value) {
              onSelect(option.value);
            } else {
              onSelect(undefined);
            }
          }}
          sx={{
            ...chipProps?.sx,
            mb: 1,
            ml: i === 0 ? 0 : 1
          }}
        />
      ))}
    </Row>
  );
};
