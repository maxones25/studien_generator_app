import { Component } from "@modules/components/types";
import { FormEntityField } from "@modules/formEntities/types";
import { useMemo } from "react";

export type EnhancedComponent = {
  data: Component;
};

export type UseComponentsResult = {
  items: EnhancedComponent[];
};

export const useComponents = (
  components: Component[],
  selectedFormFields: FormEntityField[]
): UseComponentsResult =>
  useMemo(() => {
    const items = components
      .filter((component) => {
        if (
          component.entityFields.length === 0 &&
          selectedFormFields.length === 0
        )
          return true;
        if (component.entityFields.length !== selectedFormFields.length)
          return false;
        const store: string[] = [];
        for (const fieldType of component.entityFields) {
          const selectedField = selectedFormFields.find(
            (sf) => sf.type === fieldType && !store.includes(sf.id)
          );
          if (selectedField) {
            store.push(selectedField.id);
          }
        }
        return store.length === component.entityFields.length;
      })
      .map((data) => ({
        data,
      }));

    return { items };
  }, [components, selectedFormFields]);
