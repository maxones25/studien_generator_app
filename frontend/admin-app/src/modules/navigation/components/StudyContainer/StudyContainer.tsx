import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { StudyDrawer } from "..";
import { useStudyContext } from "@modules/studies/contexts";

export interface StudyContainerProps {
  children: JSX.Element;
}

export const StudyContainer: React.FC<StudyContainerProps> = ({ children }) => {
  const getStudy = useStudyContext();

  return getStudy.isLoading ? (
    <LinearProgress />
  ) : (
    <Box height="100vh" width="100vw" display="flex" alignItems="stretch">
      <StudyDrawer title={getStudy.data?.name} />
      {children}
    </Box>
  );
};
