import { useMemo } from "react";
import { FormEntity, FormEntityField } from "@modules/formEntities/types";

export type EnhancedFormEntityField = {
  data: FormEntityField;
  isSelected: boolean;
};

export type EnhancedFormEntity = {
  data: FormEntity;
  fields: {
    items: EnhancedFormEntityField[];
  };
};

export type UseFormEntitiesResult = EnhancedFormEntity[];

export const useFormEntities = (
  formEntities: FormEntity[],
  selectedFields: { data: FormEntityField, entity: FormEntity }[]
): UseFormEntitiesResult =>
  useMemo(
    () =>
      formEntities.map((formEntity) => ({
        data: formEntity,
        fields: {
          items: formEntity.fields.map((formEntityField) => ({
            data: formEntityField,
            isSelected: selectedFields.some(({ data: field, entity }) => field.id === formEntityField.id && formEntity.id === entity.id),
          })),
        },
      })),
    [formEntities, selectedFields]
  );
