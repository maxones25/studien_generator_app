import { useGetStudy } from "@modules/studies/hooks";
import { Study } from "@modules/studies/types";
import { LinearProgress } from "@mui/material";
import { createContext, FC, ReactNode, useContext } from "react";

type StudyContextValue = Study

interface StudyProviderProps {
  children: ReactNode;
}

const StudyContext = createContext<StudyContextValue | undefined>(undefined);



export const StudyProvider: FC<StudyProviderProps> = ({ children }) => {
  const getStudy = useGetStudy();

  if(getStudy.isLoading){
    return (
      <LinearProgress/>
    )
  }

  if(getStudy.isError){
    return (
      <h1>Error</h1>
    )
  }

  const study = getStudy.data!

  return (
    <StudyContext.Provider value={study}>{children}</StudyContext.Provider>
  );
};

export const useStudy = () => {
  const context = useContext(StudyContext);

  if (!context) throw new Error("StudyContext must be inside a StudyProvider");

  return context;
};
