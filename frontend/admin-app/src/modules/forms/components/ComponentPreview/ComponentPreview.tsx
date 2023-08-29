import { Text } from "@modules/core/components";
import { FormComponent } from "@modules/formComponents/types";
import { Button } from "@mui/material";
import React from "react";
import {
  CheckBoxComponent,
  CheckBoxPreview,
  DatePickerPreview,
  DateTimeComponent,
  DateTimePickerPreview,
  HiitComponent,
  HiitPreview,
  SelectComponent,
  SelectPreview,
  SliderComponent,
  SliderPreview,
  SwitchComponent,
  SwitchPreview,
  TextFieldComponent,
  TextFieldPreview,
  TimePickerComponent,
  TimePickerPreview,
} from "..";

export interface ComponentPreviewProps {
  component: FormComponent;
  onSelect: (formComponent: FormComponent) => void;
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
  onSelect,
}) => {
  return (
    <Button
      sx={{ textTransform: "none", display: "flex", justifyContent: "stretch" }}
      onClick={() => onSelect(component)}
    >
      {component.type === "Text" ? (
        <Text textOverflow="ellipsis">{component.attributes.text}</Text>
      ) : component.type === "Select" ? (
        <SelectPreview component={component as unknown as SelectComponent} />
      ) : component.type === "Slider" ? (
        <SliderPreview component={component as unknown as SliderComponent} />
      ) : component.type === "DateTimePicker" ? (
        <DateTimePickerPreview
          component={component as unknown as DateTimeComponent}
        />
      ) : component.type === "DatePicker" ? (
        <DatePickerPreview
          component={component as unknown as TimePickerComponent}
        />
      ) : component.type === "TimePicker" ? (
        <TimePickerPreview
          component={component as unknown as TimePickerComponent}
        />
      ) : component.type === "CheckBox" ? (
        <CheckBoxPreview
          component={component as unknown as CheckBoxComponent}
        />
      ) : component.type === "Switch" ? (
        <SwitchPreview component={component as unknown as SwitchComponent} />
      ) : component.type === "TextField" ? (
        <TextFieldPreview
          component={component as unknown as TextFieldComponent}
        />
      ) : component.type === "HIIT" ? (
        <HiitPreview component={component as unknown as HiitComponent} />
      ) : (
        <Text>{component.type}</Text>
      )}
    </Button>
  );
};
