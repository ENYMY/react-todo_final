import { FC, ReactNode, Reducer, createContext, useReducer } from "react";
import { pageLoaderStatusKey } from "../../../configs/action-keys";
import { ACTIONTYPE } from "../../../types/action-type";
import { UIActionsType, uiActions } from "../actions/ui.action";

interface initialStateType {
  isLoad: boolean;
}

interface Props {
  children?: ReactNode;
}

interface UIContextType {
  state: initialStateType;
  actions: UIActionsType;
}

const initialState: initialStateType = {
  isLoad: false,
};

const UIContext = createContext<UIContextType>({
  state: initialState,
  actions: { setPageLoader: () => null },
});

const uiReducuer: Reducer<initialStateType, any> = (state, action) => {
  switch (action.type) {
    case pageLoaderStatusKey:
      return {
        ...state,
        isLoad: action.payload,
      };
    default:
      return state;
  }
};

const UIContextProvider: FC<Props> = (props: Props) => {
  const [state, dispatch] = useReducer(uiReducuer, initialState);
  const dispatchActions: UIActionsType = uiActions(dispatch);
  return (
    <UIContext.Provider value={{ state: state, actions: dispatchActions }}>
      {props.children}
    </UIContext.Provider>
  );
};

export { UIContext, UIContextProvider };
