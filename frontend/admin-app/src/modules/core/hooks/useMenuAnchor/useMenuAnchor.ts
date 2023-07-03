import { useState, MouseEvent } from "react";

export interface UseMenuAnchorResult {
  isOpen: boolean;
  element: HTMLElement | null;
  open: (event: MouseEvent<HTMLElement>) => void;
  close: () => void;
}

export const useMenuAnchor = (): UseMenuAnchorResult => {
  const [element, setElement] = useState<null | HTMLElement>(null);

  const open = (event: MouseEvent<HTMLElement>) => {
    setElement(event.currentTarget);
  };

  const close = () => {
    setElement(null);
  };

  return {
    isOpen: Boolean(element),
    element,
    open,
    close,
  };
};
