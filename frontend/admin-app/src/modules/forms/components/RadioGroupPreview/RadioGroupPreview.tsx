import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

export type RadioGroupComponent = {
  attributes: {
    label?: string;
    defaultValue?: string;
    options: string[];
  };
  id: string;
  type: "RadioGroup";
};

export interface RadioGroupPreviewProps {
  component: RadioGroupComponent;
}

export const RadioGroupPreview: React.FC<RadioGroupPreviewProps> = ({
  component,
}) => {
  const { id } = component;
  const { options, label, defaultValue } = component.attributes;
  return (
    <FormControl>
      <FormLabel id={id}>{label}</FormLabel>
      <RadioGroup aria-labelledby={id} defaultValue={defaultValue}>
        {options.map((option) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
