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
}

export const ComponentPreview: React.FC<ComponentPreviewProps> = ({
  component,
}) => {
  return (
    <Button
      sx={{ textTransform: "none", display: "flex", justifyContent: "stretch" }}
    >
      {component.type === "Text" ? (
        <Text>{component.attributes.text}</Text>
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
      ) : (
        <Text>{component.type}</Text>
      )}
    </Button>
  );
};
