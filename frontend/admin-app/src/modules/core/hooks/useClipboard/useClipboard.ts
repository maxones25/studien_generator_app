import { useEffect } from "react";
import { useValue } from "..";
export interface UseClipboardResult {
  isCopied: boolean;
  copy: (text: string) => void;

  handleCopy: (text: string) => () => Promise<void>;
}

export const useClipboard = (): UseClipboardResult => {
  const isCopied = useValue<boolean>(false);

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    isCopied.set(true);
  };

  const handleCopy = (text: string) => async () => {
    await copy(text);
  };

  useEffect(() => {
    if (isCopied.value) {
      const id = setTimeout(() => {
        isCopied.set(false);
      }, 2000);

      return () => {
        clearTimeout(id);
      };
    }
  }, [isCopied]);

  return {
    isCopied: isCopied.value,
    copy,
    handleCopy,
  };
};
