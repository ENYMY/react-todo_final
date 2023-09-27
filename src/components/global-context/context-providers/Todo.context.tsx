import {
  Dispatch,
  FC,
  ReactNode,
  Reducer,
  createContext,
  useContext,
  useReducer,
} from "react";
import {
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../../configs/action-keys";
import { uiActions } from "../actions/ui.action";
import { UIContext } from "./ui-context";
import { todoActionType, todoActions } from "../actions/todo.action";

class Todo {}

interface initialStateType {
  todoList: Array<Todo>;
  refreshStatus: boolean;
}

type ACTIONTYPE =
  | { type: string; payload: Array<Todo> }
  | { type: string; payload: any };

const intitalState: initialStateType = {
  todoList: [],
  refreshStatus: false,
};

interface TodoContextType {
  state: initialStateType;
  action: any;
}

const todoContext = createContext<TodoContextType | null>(null);

const todoReducer: Reducer<initialStateType, any> = (
  state: initialStateType,
  action: ACTIONTYPE
) => {
  switch (action.type) {
    case requestTodoDataKey:
      return {
        ...state,
        todoList: action.payload,
      };
    case refreshTodoDataKey:
      return {
        ...state,
        refreshStatus: !state.refreshStatus,
      };
    default:
      return { ...state };
  }
};

interface TodoContextProviderProp {
  children?: ReactNode;
}

const TodoContextProvider: FC<TodoContextProviderProp> = (props: TodoContextProviderProp) => {
  const [state, dispatch] = useReducer(todoReducer, intitalState);
  const uiContext = useContext(UIContext);
  const uiActions = uiContext.actions;
  const dispatchActions: todoActionType = todoActions(dispatch, uiActions);
  const contextValue = {
    state,
    action: dispatchActions,
  };
  return (
    <todoContext.Provider value={contextValue}>
      {props.children}
    </todoContext.Provider>
  );
};

export { todoContext, TodoContextProvider };
