import { Dispatch } from "react";
import { ACTIONTYPE } from "../../../types/action-type";
import { httpRequest } from "../../../helpers/http-helper";
import {
  editTodoListApi,
  getTodoListApi,
} from "../../../configs/api-endpoints";
import {
  refreshTodoDataKey,
  requestTodoDataKey,
} from "../../../configs/action-keys";
import { UIActionsType } from "./ui.action";

export type todoActionType = {
  requestTodoItem: () => void;
  addTodoItem: (body: any) => void;
  editTodoItem: (id: string | number, body: any) => void;
  removeTodoItem: (id: string | number) => void;
};

const requestTodoItem = async (
  dispatch: Dispatch<any>,
  uiActions: UIActionsType
) => {
  try {
    uiActions.setPageLoader(true);
    const responseData = await httpRequest(getTodoListApi);
    uiActions.setPageLoader(false);
    dispatch({ type: requestTodoDataKey, payload: responseData.items });
  } catch (ex) {
    uiActions.setPageLoader(false);
    console.log("Ex:- ", ex);
    dispatch({
      type: requestTodoDataKey,
      payload: [],
    });
  }
};

const addTodoItem = async (
  dispatch: Dispatch<any>,
  body: any,
  uiActions: UIActionsType
) => {
  try {
    uiActions.setPageLoader(true);
    const responseData = await httpRequest(getTodoListApi, "POST", body);
    uiActions.setPageLoader(false);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (ex) {
    uiActions.setPageLoader(false);
    console.log("Ex:- ", ex);
  }
};

const editTodoItem = async (
  dispatch: Dispatch<any>,
  id: string | number,
  body: any,
  uiActions: UIActionsType
) => {
  try {
    uiActions.setPageLoader(true);
    const responseData = await httpRequest(
      `${editTodoListApi}/${id}`,
      "PUT",
      body
    );
    uiActions.setPageLoader(false);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (ex) {
    uiActions.setPageLoader(false);
    console.log("Ex:- ", ex);
  }
};

const removeTodoItem = async (
  dispatch: Dispatch<any>,
  id: string | number,
  uiActions: UIActionsType
) => {
  try {
    uiActions.setPageLoader(true);
    const responseData = await httpRequest(
      `${editTodoListApi}/${id}`,
      "DELETE"
    );
    uiActions.setPageLoader(false);
    dispatch({
      type: refreshTodoDataKey,
    });
  } catch (ex) {
    uiActions.setPageLoader(false);
    console.log("Ex:- ", ex);
  }
};

const todoActions = (
  dispatch: Dispatch<any>,
  uiActions: UIActionsType
): todoActionType => {
  return {
    requestTodoItem: () => requestTodoItem(dispatch, uiActions),
    addTodoItem: (body: any) => addTodoItem(dispatch, body, uiActions),
    editTodoItem: (id: string | number, body: any) =>
      editTodoItem(dispatch, id, body, uiActions),
    removeTodoItem: (id: string | number) =>
      removeTodoItem(dispatch, id, uiActions),
  };
};

export { todoActions };
