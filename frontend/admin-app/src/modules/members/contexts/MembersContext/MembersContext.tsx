import { UseReadRequestResult } from "@modules/core/hooks";
import { useGetMembers } from "@modules/members/hooks";
import { Member } from "@modules/members/types";
import { createContext, FC, ReactNode, useContext } from "react";

type MembersContextValue = UseReadRequestResult<Member[]>;

interface MembersProviderProps {
  children: ReactNode;
}

const MembersContext = createContext<MembersContextValue | undefined>(
  undefined
);

export const MembersProvider: FC<MembersProviderProps> = ({ children }) => {
  const getMembers = useGetMembers();

  return (
    <MembersContext.Provider value={getMembers}>
      {children}
    </MembersContext.Provider>
  );
};

export const useMembersContext = () => {
  const context = useContext(MembersContext);

  if (!context)
    throw new Error("MembersContext must be inside a MembersProvider");

  return context;
};
