import { FC, ReactNode } from "react";
import { UIContextProvider } from "../components/global-context/context-providers/ui-context";
import { TodoContextProvider } from "../components/global-context/context-providers/Todo.context";

const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UIContextProvider>
      <TodoContextProvider>{children}</TodoContextProvider>
    </UIContextProvider>
  );
};

export { ContextProvider };
