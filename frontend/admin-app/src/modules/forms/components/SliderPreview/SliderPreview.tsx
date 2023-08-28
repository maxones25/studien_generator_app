import { FormControl, FormLabel, Slider } from "@mui/material";
import React from "react";

export type SliderComponent = {
  attributes: {
    max: number;
    min: number;
    label?: string;
    defaultValue?: number;
    maxLabel?: string;
    minLabel?: string;
  };
};
export interface SliderPreviewProps {
  component: SliderComponent;
}

export const SliderPreview: React.FC<SliderPreviewProps> = ({ component }) => {
  const { max, min, defaultValue, label, maxLabel, minLabel } =
    component.attributes;
  return (
    <FormControl fullWidth sx={{ pl: 1.5, pr: 1.5 }}>
      <FormLabel>{label}</FormLabel>
      <Slider
        min={min}
        max={max}
        value={defaultValue}
        marks={[
          {
            label: minLabel ? minLabel : min,
            value: min,
          },
          {
            label: maxLabel ? maxLabel : max,
            value: max,
          },
        ]}
      />
    </FormControl>
  );
};
