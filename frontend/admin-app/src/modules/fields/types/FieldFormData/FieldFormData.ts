export type FieldFormData = {
  id?: string;
  name: string;
  type: string;
  groupId: string | null;
  data?: {
    enum?: string[];
  };
};
