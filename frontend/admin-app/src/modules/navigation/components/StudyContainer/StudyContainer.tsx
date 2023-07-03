import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { StudyDrawer } from "..";
import { Row } from "@modules/core/components";
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
      <Row ml={1} flex={1}>
        {children}
      </Row>
    </Box>
  );
};
