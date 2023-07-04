import { useParams } from "react-router-dom";

export const useFieldId = () => {
  const { fieldId } = useParams<"fieldId">();

  return fieldId;
};
