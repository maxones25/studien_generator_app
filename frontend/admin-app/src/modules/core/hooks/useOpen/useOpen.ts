import { useState } from "react";

export interface UseOpenResult {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useOpen = (defaultValue = false): UseOpenResult => {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen(() => !isOpen);
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
};
