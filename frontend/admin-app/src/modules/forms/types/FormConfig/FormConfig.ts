export enum FormConfigType {
  TimeDependent = "TimeDependent",
  TimeIndependent = "TimeIndependent",
}

export type FormConfig = {
  id: string;
  isActive: boolean;
  type: FormConfigType;
  form: {
    id: string;
    name: string;
  };
};
