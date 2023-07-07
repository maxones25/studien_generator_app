export type Form = {
  active: boolean;
  data: {
    title: string;
    pages: {
      title: string;
      type: "Form" | "PlugIn";
      fields?: {}[];
      component?: string;
    }[];
  };
};
