import { Component } from "@modules/components/types";
import { FormComponent } from "@modules/formComponents/types";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";
import { useMemo } from "react";

export type EnhancedFormComponentAttribute = {
  data: { key: string; value: any };
  required: boolean;
};

export type EnhancedFormComponent = {
  data: FormComponent;
  attributes: EnhancedFormComponentAttribute[];
};

export const useFormComponents = (
  selectedComponent: Component | null,
  selectedFormFields: { entity: FormEntity; data: FormEntityField }[]
) =>
  useMemo(() => {
    if (selectedComponent === null) return [];
    const draftFormComponent: EnhancedFormComponent = {
      data: {
        type: selectedComponent.name,
        formFields: selectedFormFields.map(({ entity, data }) => ({
          entityId: entity.id,
          fieldId: data.id,
        })),
        attributes: selectedComponent.attributes.map(({ name }) => ({
          key: name,
          value: undefined,
        })),
      },
      attributes: selectedComponent.attributes.map(({ name, required }) => ({
        data: { key: name, value: undefined },
        required,
      })),
    };
    return [draftFormComponent];
  }, [selectedComponent, selectedFormFields]);
