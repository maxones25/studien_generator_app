export const FormConfigType = {
  TimeDependent: "TimeDependent",
  TimeIndependent: "TimeIndependent",
} as const;

export type FormConfigTypeType =
  (typeof FormConfigType)[keyof typeof FormConfigType];

export type FormConfig = {
  id: string;
  isActive: boolean;
  type: FormConfigTypeType;
  form: {
    id: string;
    name: string;
  };
};
