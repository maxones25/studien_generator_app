import { useStoredState } from "@modules/core/hooks";
import { LinearProgress } from "@mui/material";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  useEffect,
} from "react";
import { useTranslation } from "react-i18next";

interface LanguageContextValue {
  init: boolean;
  value: string;
  set: (value: string) => void;
}

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

const useLanguageContextValue = () => {
  const init = useRef<boolean>(false);
  const { i18n } = useTranslation();
  const [value, setValue] = useStoredState("lang", {
    defaultValue: "de",
    storage: localStorage,
  });

  const set = (value: string) => {
    setValue(value);
    i18n.changeLanguage(value);
  };

  useEffect(() => {
    if (!init.current) {
      set(value);
      init.current = true;
    }
  }, [init, value]);

  return { set, value, init: init.current };
};

export const LanguageProvider: FC<LanguageProviderProps> = ({ children }) => {
  const value = useLanguageContextValue();

  if (!value.init) {
    return <LinearProgress />;
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  if (!context)
    throw new Error("LanguageContext must be inside a LanguageProvider");

  return context;
};
