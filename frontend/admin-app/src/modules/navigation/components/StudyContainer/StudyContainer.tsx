import { Box } from "@mui/material";
import React from "react";
import { StudyDrawer } from "..";
import { useStudy } from "@modules/studies/contexts";

export interface StudyContainerProps {
  children: JSX.Element;
}

export const StudyContainer: React.FC<StudyContainerProps> = ({ children }) => {
  const study = useStudy();

  return (
    <Box height="100vh" width="100vw" display="flex" alignItems="stretch">
      <StudyDrawer study={study} />
      {children}
    </Box>
  );
};
