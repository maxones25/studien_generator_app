import { useParams } from "react-router-dom";

export const useStudyId = () => {
  const { studyId } = useParams<"studyId">();

  if (typeof studyId !== "string") throw new Error("studyId not found");

  return studyId;
};
