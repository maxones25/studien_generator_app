import { useParams } from "react-router-dom";

export const useEntityId = () => {
  const { entityId } = useParams<"entityId">();

  return entityId;
};
