export type Entity = {
  id: string;
  name: string;
  fields: {
    id: string;
    name: string;
    type: string;
  }[];
};
