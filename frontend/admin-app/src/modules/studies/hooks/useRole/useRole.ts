import { useStudy } from "@modules/studies/contexts";

export interface UseRoleResult {
  isAdmin: boolean;
}

export const useRole = (): UseRoleResult => {
  const study = useStudy();

  const isAdmin = study.role === "admin";

  return {
    isAdmin,
  };
};
