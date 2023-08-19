import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { StudyDrawer } from "..";
import { useStudyContext } from "@modules/studies/contexts";

export interface StudyContainerProps {
  children: JSX.Element;
}

export const StudyContainer: React.FC<StudyContainerProps> = ({ children }) => {
  const getStudy = useStudyContext();

  if (getStudy.isLoading) {
    return <LinearProgress />;
  }

  if (getStudy.isError) throw new Error()

  const study = getStudy.data!

  return (
    <Box height="100vh" width="100vw" display="flex" alignItems="stretch">
      <StudyDrawer study={study} />
      {children}
    </Box>
  );
};
