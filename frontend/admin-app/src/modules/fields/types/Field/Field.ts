export type Field =
  | {
      id: string;
      name: string;
      type: Exclude<string, "Enum">;
    }
  | {
      id: string;
      name: string;
      type: "Enum";
      values: string[];
    };
