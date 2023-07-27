export type FormConfig = {
  id: string;
  isActive: boolean;
  type: "TimeDependend" | "TimeIndependend" | "Both";
  form: {
    id: string;
    name: string;
  };
};
