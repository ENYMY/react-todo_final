import React, { Component, ReactNode } from "react";

interface Props {
    children?: ReactNode
}

interface State  {
  hasError: boolean;
};

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError : false
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      console.error("Error: " + error + "\nError Info:" + errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went Wrong</div>;
    }
    return this.props.children;
  }
}

export { ErrorBoundary };
