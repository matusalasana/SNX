
import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("React Error:", error);
    console.error("Component Stack:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 text-center text-white">
          <h1 className="text-2xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-3 max-w-xl text-zinc-400">
            {this.state.error?.message || "Unknown error"}
          </p>

          <button
            onClick={() =>
              this.setState({
                hasError: false,
                error: null,
              })
            }
            className="mt-6 rounded-lg bg-amber-500 px-4 py-2 font-medium text-black"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}