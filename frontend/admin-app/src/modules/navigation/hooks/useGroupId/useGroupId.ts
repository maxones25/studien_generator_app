import { useParams } from "react-router-dom";

export const useGroupId = () => {
  const { groupId } = useParams<"groupId">();

  return groupId;
};
