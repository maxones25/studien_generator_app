import { To, useNavigate } from "react-router-dom";

export const useNavigationHelper = () => {
  const to = useNavigate();

  const back = () => {
    to(-1);
  };

  const handle = (url: To) => () => {
    to(url);
  };

  return {
    to,
    back,
    handle,
  };
};
