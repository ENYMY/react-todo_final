import { Dispatch } from "react";
import { pageLoaderStatusKey } from "../../../configs/action-keys";
import { ACTIONTYPE } from "../../../types/action-type";

export type UIActionsType = {
  setPageLoader: (status: boolean) => void;
};

const setPageLoader = async (
  dispatch: Dispatch<ACTIONTYPE>,
  status: boolean
) => {
  dispatch({
    type: pageLoaderStatusKey,
    payload: status,
  });
};

const uiActions = (dispatch: Dispatch<ACTIONTYPE>): UIActionsType => {
  return {
    setPageLoader: (status: boolean) => setPageLoader(dispatch, status),
  };
};

export { uiActions };
