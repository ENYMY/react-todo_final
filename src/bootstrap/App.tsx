import React, { FC } from "react";
import { ErrorBoundary } from "../components/ui-elements/common/ErrorBoundary";
import { ContextProvider } from "./Providers";

const App: FC = () => {
  return (
    <ErrorBoundary>
      <ContextProvider>{""}</ContextProvider>
    </ErrorBoundary>
  );
};

export default App;
